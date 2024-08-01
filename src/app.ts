import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import * as middlewares from './middlewares';
import MessageResponse from './interfaces/MessageResponse';
import { stat } from 'fs';
import { PrismaClient } from '@prisma/client';

import brokerRoutes from './routes/broker.routes';
import customerRoutes from './routes/customer.routes';
import openingAccountRoutes from './routes/opening_account.routes';
import otpRoutes from './routes/otp.routes';
import path from 'path';


require('dotenv').config();

const app = express();
const prisma = new PrismaClient();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

// middleware api key
app.use(middlewares.authenticateAPIKey);

// Routes
app.use(brokerRoutes);
app.use(customerRoutes);
app.use(openingAccountRoutes);
app.use(otpRoutes);

app.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  });
});

app.get('/hello', (req, res) => {
    res.json({
        meta:
        {
            code: 200,
            message: 'OK',
        },
        message: 'Hello World!',
    });
});

app.get('/about', (req, res) => {
    res.status(200).send('About page');
});

app.post('/customerss', async (req, res) => {
  const { email, broker_id } = req.body;

  try {
      const result = await prisma.$transaction(async (prisma) => {
          const customer = await prisma.customer.create({
              data: { email }
          });
          const customerTransaction = await prisma.customerTransaction.create({
              data: {
                  customer_id: customer.id,
                  email: customer.email,
                  broker_id
              },
          });
          const getBrokerName = await prisma.broker.findFirst({
              where: { id: broker_id },
              select: { nama: true },
          });

          return {
              customer,
              customerTransaction,
              brokerName: getBrokerName?.nama,
          };
      });

      res.status(201).json({
          meta: {
              code: 201,
              message: 'Created',
          },
          data: result,
      });
  } catch (error) {
      console.error('Error creating customer:', error);
      res.status(500).json({
          meta: {
              code: 500,
              message: 'Error creating customer',
          },
          error: error,
      });
  }
});


app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;