// Get About broker
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getOneBroker = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const broker = await prisma.broker.findUnique({
            where: {
                id: parseInt(id),
            },
        });
        res.status(200).json({
            meta: {
                code: 200,
                message: 'OK',
            },
            data: broker,
        });
    } catch (error) {
        console.error('Error fetching broker:', error);
        res.status(500).json({
            meta: {
                code: 500,
                message: 'Internal Server Error',
            },
            error: error || 'An unexpected error occurred',
        });
    }
};

export const getAllBrokers = async (req: Request, res: Response) => {
    const brokers = await prisma.broker.findMany();
    try {
        res.status(200).json({
            meta: {
                code: 200,
                message: 'OK',
            },
            data: brokers,
        });
    }catch (error) {
        console.error('Error fetching brokers:', error);
        res.status(500).json({
            meta: {
                code: 500,
                message: 'Internal Server Error',
            },
            error: error || 'An unexpected error occurred',
        });
    }
}
export const getOneBrokerByCode = async (req: Request, res: Response) => {
  const { code } = req.params;

  if (!code) {
    return res.status(400).json({
      meta: {
        code: 400,
        message: 'Bad Request: Missing broker code',
      },
    });
  }

  try {
    const broker = await prisma.broker.findMany({
      where: {
        kode: code.toString(),
      },
    });

    if (!broker) {
      return res.status(404).json({
        meta: {
          code: 404,
          message: 'Broker not found',
        },
      });
    }

    res.status(200).json({
      meta: {
        code: 200,
        message: 'OK',
      },
      data: broker,
    });
  } catch (error) {
    console.error('Error fetching broker:', error);
    res.status(500).json({
      meta: {
        code: 500,
        message: 'Internal Server Error',
      },
      error: error || 'An unexpected error occurred',
    });
  }
};
