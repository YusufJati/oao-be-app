// for post opening account
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { OpeningAccount } from '../../interfaces/InterfaceDb';
import * as middlewares from '../../middlewares';


const prisma = new PrismaClient();

export const createOpeningAccount = async (req: Request, res: Response) => {
    const data : OpeningAccount = req.body;
    try {
        // get customer id from customer transaction
        const openingAccount = await prisma.openingAccount.create({
            data: {
                customerTransaction: { connect: { id: data.customerTransactionId } },
                alamat_perusahaan: data.alamat_perusahaan,
            },
        });
        res.status(201).json({
            meta: {
                code: 201,
                message: 'Created',
            },
            data: openingAccount,
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
}