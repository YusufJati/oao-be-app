import { Router } from 'express';
import nodemailer from 'nodemailer';
import { PrismaClient } from '@prisma/client';
import * as middlewares from '../../middlewares';
import * as crypto from 'crypto';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

export function generateOTP(length: number) {
  return crypto.randomBytes(length).toString('hex').slice(0, length).toUpperCase();
}

// Fungsi untuk mengirim email
export async function sendOTPEmail(to: string, otp: string): Promise<void> {
    // Konfigurasi transport email
    let transporter = nodemailer.createTransport({
      service: 'gmail', // atau layanan email lainnya
      auth: {
        user: process.env.MAIL_USER, // ganti dengan email Anda
        pass: process.env.MAIL_PASS   // ganti dengan password email Anda
      }
    });

    const emailTemplatePath = path.join(__dirname, './template/index.html');
    let emailTemplate = fs.readFileSync(emailTemplatePath, 'utf-8');
    emailTemplate = emailTemplate
      .replace('{{otpCode}}', otp)
      .replace('{{currentDate}}', new Date().toLocaleDateString())
  
    // Konten email
    let mailOptions = {
      from: process.env.MAIL_USER,
      to: to,
      subject: 'Your OTP Code',
      html: emailTemplate
    };
  
    // Kirim email
    await transporter.sendMail(mailOptions);
}

// Fungsi untuk menghasilkan OTP dan memperbarui/menyimpan transaksi pelanggan
export const generateAndSendOTP = async (email: string) => {
  try {
      // Cek apakah email ada di tabel customer
      const customer = await prisma.customer.findFirst({
          where: { email }
      });

      if (!customer) {
          throw new Error('Customer not found');
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

      return {
          meta: {
              code: 201,
              status: 'success',
              message: 'OTP has been sent to your email.',
          },
          otp: otpCode,
          customerTransactionId: customerTransaction.id,
      };
  } catch (err) {
      console.error(err);
      throw new Error('Failed to send OTP');
  }
}


