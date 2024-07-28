import { Router } from 'express';
import nodemailer from 'nodemailer';
import * as middlewares from '../../middlewares';
import * as crypto from 'crypto';

export function generateOTP(length: number) {
    return crypto.randomBytes(length).toString('hex').slice(0, length);
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
  
    // Konten email
    let mailOptions = {
      from: process.env.MAIL_USER,
      to: to,
      subject: 'Your OTP Code',
      text: `Your OTP code is: ${otp}`
    };
  
    // Kirim email
    await transporter.sendMail(mailOptions);
}


