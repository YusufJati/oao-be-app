// Get Customer
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { Customer } from '../../interfaces/InterfaceDb';

const prisma = new PrismaClient();

// Get one customer by id
export const getOneCustomer = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const customer = await prisma.customer.findUnique({
        where: {
          id: parseInt(id),
        },
      });
      res.status(200).json({
        meta: {
          code: 200,
          message: 'OK',
        },
        data: customer,
      });
    } catch (error) {
      console.error('Error fetching customer:', error);
      res.status(500).json({
        meta: {
          code: 500,
          message: 'Internal Server Error',
        },
        error: error || 'An unexpected error occurred',
      });
    }
};

// Get all customers
export const getAllCustomers = async (req: Request, res: Response) => {
    try {
      const customers = await prisma.customer.findMany();
      res.status(200).json({
        meta: {
          code: 200,
          message: 'OK',
        },
        data: customers,
      });
    } catch (error) {
      console.error('Error fetching customers:', error);
      res.status(500).json({
        meta: {
          code: 500,
          message: 'Internal Server Error',
        },
        error: error || 'An unexpected error occurred',
      });
    }
};

