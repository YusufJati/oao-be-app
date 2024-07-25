// for post customer
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { Customer } from '../../interfaces/InterfaceDb';

const prisma = new PrismaClient();

export const createCustomer = async (req: Request, res: Response) => {
    // get from interface
    const data: Customer = req.body;
    try {
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
                jenis_kelamin: data.jenis_kelamin,
                golongan_darah: data.golongan_darah,
                kode_negara: data.kode_negara,
                status_pernikahan: data.status_pernikahan,
                jenis_identitas: data.jenis_identitas,
                rt_rw: data.rt_rw,
                agama: data.agama,
                pekerjaan: data.pekerjaan,
                kewarganegaraan: data.kewarganegaraan,
                tanggal_berlaku: data.tanggal_berlaku,
                foto: data.foto,
                tanda_tangan: data.tanda_tangan,
                tanggal_input: data.tanggal_input,
            },
        });
        res.status(201).json({
            meta: {
                code: 201,
                message: 'Created',
            },
            data: customer,
        });
    } catch (error) {
        console.error('Error creating customer:', error);
        res.status(500).json({
            meta: {
                code: 500,
                message: 'Internal Server Error',
            },
            error: error || 'An unexpected error occurred',
        });
    }
}