// for post opening account
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { OpeningAccount } from '../../interfaces/InterfaceDb';
import * as middlewares from '../../middlewares';


const prisma = new PrismaClient();

export const createOpeningAccount = async (req: Request, res: Response) => {
    const { customerTransactionId, ...data } : OpeningAccount & { customerTransactionId: number } = req.body;
  
    try {
      const customerTransaction = await prisma.customerTransaction.findUnique({
        where: { id: customerTransactionId }
      });
  
      if (!customerTransaction) {
        console.error(`Customer transaction not found: ${customerTransactionId}`);
        return res.status(404).json({
          meta: {
            code: 404,
            message: 'Customer transaction not found',
          },
        });
      }
      
      const tandaTanganBuffer = data.tanda_tangan ? Buffer.from(data.tanda_tangan.toString('base64'), 'base64') : undefined;
      const openingAccount = await prisma.openingAccount.create({
        data: {
          customerTransaction: {
            connect: { id: customerTransaction.id }
          },
          efek_saham: data.efek_saham,
          efek_utang: data.efek_utang,
          efek_reksa_dana: data.efek_reksa_dana,
          pendidikan_terakhir: data.pendidikan_terakhir,
          nama_ibu_kandung: data.nama_ibu_kandung,
          nama_perusahaan: data.nama_perusahaan,
          alamat_perusahaan: data.alamat_perusahaan,
          nomor_perusahaan: data.nomor_perusahaan,
          kode_pos: data.kode_pos,
          jenis_pekerjaan: data.jenis_pekerjaan,
          email_perusahaan: data.email_perusahaan,
          jabatan: data.jabatan,
          bidang_usaha: data.bidang_usaha,
          lama_bekerja: data.lama_bekerja,
          penghasilan_pertahun: data.penghasilan_pertahun,
          penghasilan_tambahan_pertahun: data.penghasilan_tambahan_pertahun,
          sumber_penghasilan_utama: data.sumber_penghasilan_utama,
          sumber_penghasilan_tambahan: data.sumber_penghasilan_tambahan,
          sumber_pendanaan_transaksi: data.sumber_pendanaan_transaksi,
          tujuan_investasi: data.tujuan_investasi,
          tanda_tangan: data.tanda_tangan ? Buffer.from(data.tanda_tangan.toString('base64'), 'base64') : undefined,
        },
      });

      const tandaTanganSize = tandaTanganBuffer ? tandaTanganBuffer.length : 0;
      const sizeInKB = tandaTanganSize / 1024;
      const sizeInMB = sizeInKB / 1024;
  
      res.status(201).json({
        meta: {
          code: 201,
          message: 'Created',
        },
        data: openingAccount,
        // get tanda_tangan size in bytes (kb or mb)
        size: `Ukuran tanda tangan: ${tandaTanganSize} bytes (${sizeInKB} KB, ${sizeInMB} MB)`,
      });
    } catch (error) {
      console.error('Error creating opening account:', error);
      res.status(500).json({
        meta: {
          code: 500,
          message: 'Error creating opening account',
        },
        error: error || 'An unexpected error occurred',
      });
    }
  };