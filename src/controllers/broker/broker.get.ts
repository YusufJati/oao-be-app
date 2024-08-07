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
        kode: {contains: code.toLowerCase(), mode: 'insensitive'},
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

export const getBrokerByLimit = async (req: Request, res: Response) => {
  const { limit } = req.params;
  try {
    const brokers = await prisma.broker.findMany({
      take: parseInt(limit),
      select: {
        id: true,
        kode: true,
        nama: true,
      }
    });
    res.status(200).json({
      meta: {
        code: 200,
        message: 'OK',
      },
      data: brokers,
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
}

// API untuk mengirim data broker yang dipilih dari banyak id ke api lain menggunakan method POST
const brokerDataStore: { [key: string]: number[] } = {};

interface Broker {
  id: number;
  name: string;
  // Other broker fields...
}

interface ApiResponse {
  meta: {
    code: number;
    message: string;
  };
  data: Broker[];
}

// API untuk mengirim data broker yang dipilih dari banyak id ke api lain menggunakan method POST
export const sendBrokerData = async (req: Request, res: Response) => {
  const { url, broker_ids } = req.body;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.API_KEY || '',
      },
      body: JSON.stringify({ broker_ids }),
    });
    const data = await response.json();
    
    // Simpan broker_ids ke dalam brokerDataStore
    brokerDataStore[url] = broker_ids;

    res.status(200).json({
      meta: {
        code: 200,
        message: 'OK',
      },
      data: data,
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

// API untuk menerima data broker yang dipilih dari banyak id dari api lain menggunakan method GET dan menampilkan full data broker
export const getBrokerData = async (req: Request, res: Response) => {
  const { url } = req.query;

  try {
    // Mendapatkan broker_ids dari brokerDataStore
    const broker_ids = brokerDataStore[url as string];

    if (!broker_ids) {
      return res.status(404).json({
        meta: {
          code: 404,
          message: 'No broker data found for the given URL',
        },
      });
    }

    const brokers = await prisma.broker.findMany({
      where: {
        id: {
          in: broker_ids,
        },
      },
    });

    res.status(200).json({
      meta: {
        code: 200,
        message: 'OK',
      },
      data: brokers,
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

export const receiveBrokerData = (req: Request, res: Response) => {
  const { broker_ids }: { broker_ids: number[] } = req.body;
  // Simulate fetching or processing data based on broker_ids
  const brokers = broker_ids.map((id: number) => ({
    id,
    name: `Broker ${id}`,
    // Other broker data...
  }));

  res.status(200).json({
    meta: {
      code: 200,
      message: 'Data received successfully',
    },
    data: brokers,
  });
};

