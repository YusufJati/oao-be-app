import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import * as middlewares from './middlewares';
import MessageResponse from './interfaces/MessageResponse';
import { stat } from 'fs';

import brokerRoutes from './routes/broker.routes';
import customerRoutes from './routes/customer.routes';
import openingAccountRoutes from './routes/opening_account.routes';


require('dotenv').config();

const app = express();

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

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;