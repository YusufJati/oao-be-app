import { Router } from "express";
import { generateOTP, sendOTPEmail } from '../controllers/otp/otp.controller';
import { ValidateOTPRequest } from "../interfaces/InterfaceDb";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = Router();

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
            status: 'success',
            message: 'OTP has been sent to your email.',
        },
        customerTransactionId: customerTransaction.id,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ status: 'error', message: 'Failed to send OTP' });
    }
  });

// Route untuk verifikasi OTP
router.post('/validate-otp', async (req, res) => {
  const { otp } = req.body;

  try {
    const customerTransaction = await prisma.customerTransaction.findFirst({
      where: { kode_otp: otp }
    });

    if (!customerTransaction) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    await prisma.customerTransaction.update({
      where: { id: customerTransaction.id }, // Use the transaction ID to update the record
      data: { kode_otp: null }
    });

    res.status(200).json({ message: 'OTP validated successfully', customerTransactionId: customerTransaction.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to validate OTP' });
  }
});

export default router;