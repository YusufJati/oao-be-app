import { Router } from "express";
import { generateOTP, sendOTPEmail } from '../controllers/otp/otp.controller';
import { ValidateOTPRequest } from "../interfaces/InterfaceDb";
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';


const prisma = new PrismaClient();
const router = Router();

// Varibel untuk konfigurasi OTP
const SECRET_KEY = 'your_secret_key';
const OTP_VALIDITY_DURATION = 10 * 60 * 1000; // 10 minutes
const MAX_ATTEMPTS = 3;

// Route untuk mengirim OTP
router.post('/generate-otp', async (req, res) => {
    const { email } = req.body;
  
    try {
      // Cek apakah email ada di tabel customer
      const customer = await prisma.customer.findFirst({
        where: { email }
      });
  
      if (!customer) {
        return res.status(404).json({ error: 'Customer not found' });
      }
  
      const otpCode = generateOTP(6); // Menghasilkan OTP dengan panjang 6 karakter
  
      // Cek apakah transaksi pelanggan sudah ada untuk email tersebut
      const existingTransaction = await prisma.customerTransaction.findFirst({
        where: { email }
      });
  
      let customerTransaction;
      if (existingTransaction) {
        // Perbarui transaksi yang ada dengan kode OTP baru
        customerTransaction = await prisma.customerTransaction.update({
          where: { id: existingTransaction.id },
          data: { kode_otp: otpCode }
        });
      } else {
        // Buat transaksi baru jika belum ada
        customerTransaction = await prisma.customerTransaction.create({
          data: {
            customer_id: customer.id,
            broker_id: null, // Set broker_id sesuai kebutuhan Anda atau bisa diubah sesuai permintaan Anda
            email,
            kode_otp: otpCode,
          },
        });
      }
  
      await sendOTPEmail(email, otpCode);
  
      res.status(201).json({
        meta: {
            code: 201,
            status: 'success',
            message: 'OTP has been sent to your email.',
        },
        otp: otpCode,
        customerTransactionId: customerTransaction.id,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({code: 500, status: 'error', message: 'Failed to send OTP' });
    }
  });

// Route untuk verifikasi OTP
router.post('/validate-otp', async (req, res) => {
  const { email, otp } = req.body;

  try {
    const customerTransaction = await prisma.customerTransaction.findFirst({
      where: { email: email, kode_otp: otp }
    });

    if (!customerTransaction) {
      return res.status(400).json({
        meta: {
          code: 400,
          status: 'error',
          message: 'Invalid OTP'
        }
      });
    }

    await prisma.customerTransaction.update({
      where: { id: customerTransaction.id },
      data: { kode_otp: null }
    });

    const customer = await prisma.customer.findUnique({
      where: { id: customerTransaction.customer_id }
    });

    if (!customer) {
      return res.status(404).json({
        meta: {
          code: 404,
          status: 'error',
          message: 'Customer not found'
        }
      });
    }

    res.status(200).json({
      meta: {
        code: 200,
        status: 'success',
        message: 'OTP validated successfully'
      },
      data: {
        customerTransactionId: customerTransaction.id,
        customerData: {
          id: customer.id,
          nik: customer.nik,
          nama: customer.nama,
          email: customer.email,
          alamat: customer.alamat,
          kelurahan: customer.kelurahan,
          kecamatan: customer.kecamatan,
          provinsi: customer.provinsi,
          kota: customer.kota,
          tanggal_lahir: customer.tanggal_lahir,
          tempat_lahir: customer.tempat_lahir,
          jenis_kelamin: customer.jenis_kelamin,
          golongan_darah: customer.golongan_darah,
          status_pernikahan: customer.status_pernikahan,
          rt_rw: customer.rt_rw,
          agama: customer.agama,
          pekerjaan: customer.pekerjaan,
          tanggal_berlaku: customer.tanggal_berlaku,
          foto: customer.foto?.toString('base64'),
          tanda_tangan: customer.tanda_tangan?.toString('base64'),
          tanggal_input: customer.tanggal_input,
        }
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      meta: {
        code: 500,
        status: 'error',
        message: 'Failed to validate OTP'
      },
      error: err || 'An unexpected error occurred'
    });
  }
});


export default router;