// for post customer
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { Customer } from '../../interfaces/InterfaceDb';
import { generateAndSendOTP, generateOTP, sendOTPEmail } from '../otp/otp.controller'; // Pastikan jalur impor sesuai dengan lokasi fungsi

const prisma = new PrismaClient();

export const createCustomer = async (req: Request, res: Response) => {
    const data: Customer = req.body;
    const statusPernikahan = req.body.status_pernikahan;

    try {
        const result = await prisma.$transaction(async (prisma) => {
            // Membuat customer
            const customer = await prisma.customer.create({
                data: {
                    nik: data.nik,
                    nama: data.nama,
                    email: data.email,
                    alamat: data.alamat,
                    kelurahan: data.kelurahan,
                    kecamatan: data.kecamatan,
                    provinsi: data.provinsi,
                    tanggal_lahir: data.tanggal_lahir,
                    tempat_lahir: data.tempat_lahir,
                    jenis_kelamin: data.jenis_kelamin,
                    golongan_darah: data.golongan_darah,
                    status_pernikahan: statusPernikahan,
                    rt_rw: data.rt_rw,
                    agama: data.agama,
                    kewarganegaraan: data.kewarganegaraan,
                    pekerjaan: data.pekerjaan,
                    tanggal_berlaku: data.tanggal_berlaku,
                    foto: data.foto ? Buffer.from(data.foto.toString('base64'), 'base64') : undefined,
                    tanda_tangan: data.tanda_tangan ? Buffer.from(data.tanda_tangan.toString('base64'), 'base64') : undefined,
                    tanggal_input: data.tanggal_input,
                },
            });

            // get foto and tanda_tangan size
            const fotoBuffer = data.foto ? Buffer.from(data.foto.toString('base64'), 'base64') : undefined;
            const tandaTanganBuffer = data.tanda_tangan ? Buffer.from(data.tanda_tangan.toString('base64'), 'base64') : undefined;
            const fotoSize = fotoBuffer ? fotoBuffer.length : 0;
            const tandaTanganSize = tandaTanganBuffer ? tandaTanganBuffer.length : 0;
            const fotoSizeInKB = fotoSize / 1024;   
            const tandaTanganSizeInKB = tandaTanganSize / 1024;
            const fotoSizeInMB = fotoSizeInKB / 1024;
            const tandaTanganSizeInMB = tandaTanganSizeInKB / 1024;

            // Membuat customer_transaction dan menghasilkan OTP
            const otpCode = generateOTP(6);
            const customerTransaction = await prisma.customerTransaction.create({
                data: {
                    customer_id: customer.id,
                    email: customer.email,
                    broker_id: data.id_broker,
                    kode_otp: otpCode,
                    created_at: data.tanggal_input,
                    updated_at: data.tanggal_input,
                },
            });

            // Mengirim OTP melalui email
            await sendOTPEmail(data.email, otpCode);

            return { customer, customerTransaction, fotoSizeInKB, tandaTanganSizeInKB, fotoSizeInMB, tandaTanganSizeInMB };
        });

        res.status(201).json({
            meta: {
                code: 201,
                message: 'Created',
            },
            data: result,
            size: {
                foto: `Ukuran foto: ${result.fotoSizeInKB} KB, ${result.fotoSizeInMB} MB`,
                tanda_tangan: `Ukuran tanda tangan: ${result.tandaTanganSizeInKB} KB, ${result.tandaTanganSizeInMB} MB`,
            },
        });
    } catch (error) {
        console.error('Error creating customer:', error);
        res.status(500).json({
            meta: {
                code: 500,
                message: 'Error creating customer',
            },
            error: error || 'An unexpected error occurred',
        });
    }
}
