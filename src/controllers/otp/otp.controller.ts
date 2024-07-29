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

  // Template HTML email
  const emailTemplate = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <title>Your OTP Code</title>
      <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap"
          rel="stylesheet"
      />
  </head>
  <body
      style="
          margin: 0;
          font-family: 'Poppins', sans-serif;
          background: #ffffff;
          font-size: 14px;
      "
  >
      <div
          style="
              max-width: 680px;
              margin: 0 auto;
              padding: 45px 30px 60px;
              background: #f4f7ff;
              background-image: url('https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661497957196_595865/email-template-background-banner');
              background-repeat: no-repeat;
              background-size: 800px 452px;
              background-position: top center;
              font-size: 14px;
              color: #434343;
          "
      >
          <header>
              <table style="width: 100%;">
                  <tbody>
                      <tr style="height: 0;">
                          <td>
                              <span
                                  style="font-size: 16px; line-height: 30px; color: #ffffff;"
                                  >OAO Dev</span
                              >
                          </td>
                          <td style="text-align: right;">
                              <span
                                  style="font-size: 16px; line-height: 30px; color: #ffffff;"
                                  >{{currentDate}}</span
                              >
                          </td>
                      </tr>
                  </tbody>
              </table>
          </header>

          <main>
              <div
                  style="
                      margin: 0;
                      margin-top: 70px;
                      padding: 92px 30px 115px;
                      background: #ffffff;
                      border-radius: 30px;
                      text-align: center;
                  "
              >
                  <div style="width: 100%; max-width: 489px; margin: 0 auto;">
                      <h1
                          style="
                              margin: 0;
                              font-size: 24px;
                              font-weight: 500;
                              color: #1f1f1f;
                          "
                      >
                          Your OTP Code
                      </h1>
                      <p
                          style="
                              margin: 0;
                              margin-top: 17px;
                              font-weight: 500;
                              letter-spacing: 0.56px;
                          "
                      >
                      Terima kasih telah memilih layanan kami. 
                      Gunakan kode OTP berikut untuk menyelesaikan proses verifikasi Anda. 
                      Kode OTP ini berlaku selama
                          <span style="font-weight: 600; color: #1f1f1f;">5 menit</span>.
                          Mohon jangan bagikan kode ini kepada siapa pun.
                      </p>
                      <p
                          style="
                              margin: 0;
                              margin-top: 60px;
                              font-size: 40px;
                              font-weight: 600;
                              letter-spacing: 25px;
                              color: #ba3d4f;
                          "
                      >
                          {{otpCode}}
                      </p>
                  </div>
              </div>

              <p
                  style="
                      max-width: 400px;
                      margin: 0 auto;
                      margin-top: 90px;
                      text-align: center;
                      font-weight: 500;
                      color: #8c8c8c;
                  "
              >
                  Butuh bantuan? Contact us at
                  <a
                      href="mailto:support@example.com"
                      style="color: #499fb6; text-decoration: none;"
                      >support@example.com</a
                  >
                  atau kunjungi
                  <a
                      href="https://example.com/help"
                      target="_blank"
                      style="color: #499fb6; text-decoration: none;"
                      >Help Center</a
                  >
              </p>
          </main>

          <footer
              style="
                  width: 100%;
                  max-width: 490px;
                  margin: 20px auto 0;
                  text-align: center;
                  border-top: 1px solid #e6ebf1;
              "
          >
              <p
                  style="
                      margin: 0;
                      margin-top: 40px;
                      font-size: 16px;
                      font-weight: 600;
                      color: #434343;
                  "
              >
                  OAO Dev
              </p>
              <div style="margin: 0; margin-top: 16px;">
                  <a href="https://facebook.com" target="_blank" style="display: inline-block;">
                      <img
                          width="36px"
                          alt="Facebook"
                          src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661502815169_682499/email-template-icon-facebook"
                      />
                  </a>
                  <a
                      href="https://instagram.com"
                      target="_blank"
                      style="display: inline-block; margin-left: 8px;"
                  >
                      <img
                          width="36px"
                          alt="Instagram"
                          src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661504218208_684135/email-template-icon-instagram"
                      />
                  </a>
                  <a
                      href="https://twitter.com"
                      target="_blank"
                      style="display: inline-block; margin-left: 8px;"
                  >
                      <img
                          width="36px"
                          alt="Twitter"
                          src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661503043040_372004/email-template-icon-twitter"
                      />
                  </a>
                  <a
                      href="https://youtube.com"
                      target="_blank"
                      style="display: inline-block; margin-left: 8px;"
                  >
                      <img
                          width="36px"
                          alt="Youtube"
                          src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661503195931_210869/email-template-icon-youtube"
                      />
                  </a>
              </div>
              <p style="margin: 0; margin-top: 16px; color: #434343;">
                  Copyright © 2024 Your Company. All rights reserved.
              </p>
          </footer>
      </div>
  </body>
  </html>
  `;

  // Gantikan placeholder dengan nilai aktual
  const emailContent = emailTemplate
      .replace('{{otpCode}}', otp)
      .replace('{{currentDate}}', new Date().toLocaleDateString());

  // Konten email
  let mailOptions = {
      from: process.env.MAIL_USER,
      to: to,
      subject: 'Your OTP Code',
      html: emailContent
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


