import { Router } from 'express';
import nodemailer from 'nodemailer';
import * as middlewares from '../../middlewares';
import * as crypto from 'crypto';
import fs from 'fs';
import path from 'path';

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


