// import { Router } from 'express';
// import otpGenerator from 'otp-generator';
// import nodemailer from 'nodemailer';
// import { OTP } from '../../models/otp.model';

// export const generateOTP = async (req, res) => {
//     const { email } = req.body;

//     const otp = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });

//     try {
//         await OTP.create({ email, otp });

//         // Send OTP via email (replace with your email sending logic)
//         const transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//                 user: 'your-mail@gmail.com',
//                 pass: 'your-app-password'
//             }
//         });

//         await transporter.sendMail({
//             from: 'your-mail@gmail.com',
//             to: email,
//             subject: 'OTP Verification',
//             text: `Your OTP for verification is: ${otp}`
//         });

//         res.status(200).send('OTP sent successfully');
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Error sending OTP');
//     }
// };


