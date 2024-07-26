// Get opening account data
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { OpeningAccount } from '../../interfaces/InterfaceDb';
import * as middlewares from '../../middlewares';

const prisma = new PrismaClient();

export const getOneOpeningAccount = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const openingAccount = await prisma.openingAccount.findUnique({
            where: {
                id: parseInt(id),
            },
        });
        res.status(200).json({
            meta: {
                code: 200,
                message: 'OK',
            },
            data: openingAccount,
        });
    } catch (error) {
        console.error('Error fetching opening account:', error);
        res.status(500).json({
            meta: {
                code: 500,
                message: 'Error fetching opening account',
            },
            error: error || 'An unexpected error occurred',
        });
    }
}

export const getAllOpeningAccounts = async (req: Request, res: Response) => {
    try {
        const openingAccounts = await prisma.openingAccount.findMany();
        res.status(200).json({
            meta: {
                code: 200,
                message: 'OK',
            },
            data: openingAccounts,
        });
    } catch (error) {
        console.error('Error fetching opening accounts:', error);
        res.status(500).json({
            meta: {
                code: 500,
                message: 'Error fetching opening accounts',
            },
            error: error || 'An unexpected error occurred',
        });
    }
}