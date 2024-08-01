// Get Customer
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { Customer } from '../../interfaces/InterfaceDb';
import * as middlewares from '../../middlewares';

const prisma = new PrismaClient();

// Get one customer by id
export const getOneCustomer = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
      // mencari berdasarkan id
      const customer = await prisma.customer.findUnique({
          where: {
              id: parseInt(id),
          },
          include: {
              CustomerTransaction: {
                  select: {
                      broker: {
                          select: {
                              id: true,
                              nama: true,
                              kode: true,
                          },
                      },
                  },
              },
          },
      });

      if (!customer) {
          return res.status(404).json({
              meta: {
                  code: 404,
                  message: 'Customer not found',
              },
          });
      }

      // menampilkan data customer
      const result = {
          id: customer.id,
          nik: customer.nik,
          nama: customer.nama,
          email: customer.email,
          alamat: customer.alamat,
          kelurahan: customer.kelurahan,
          kecamatan: customer.kecamatan,
          provinsi: customer.provinsi,
          kota: customer.kota,
          tanggal_lahir: customer.tanggal_lahir,
          jenis_kelamin: customer.jenis_kelamin,
          golongan_darah: customer.golongan_darah,
          status_pernikahan: customer.status_pernikahan,
          rt_rw: customer.rt_rw,
          agama: customer.agama,
          pekerjaan: customer.pekerjaan,
          kewarganegaraan: customer.kewarganegaraan,
          tanggal_berlaku: customer.tanggal_berlaku,
          foto: customer.foto,
          tanda_tangan: customer.tanda_tangan,
          tanggal_input: customer.tanggal_input,
          broker: customer.CustomerTransaction.map(transaction => transaction.broker)
      };

      res.status(200).json({
          meta: {
              code: 200,
              message: 'OK',
          },
          data: result,
      });
  } catch (error) {
      console.error('Error fetching customer:', error);
      res.status(500).json({
          meta: {
              code: 500,
              message: 'Error fetching customer',
          },
          error: error || 'An unexpected error occurred',
      });
  }
};

// Get one customer by nik
export const getOneCustomerByNik = async (req: Request, res: Response) => {
    const { nik } = req.params;
    try {
        // mencari berdasarkan nik
        const customer = await prisma.customer.findFirst({
            where: {
                nik: {
                    contains: nik,
                },
            },
            include: {
                CustomerTransaction: {
                    include: {
                        broker: {
                            select: {
                                id: true,
                                nama: true,
                                kode: true,
                            },
                        },
                    },
                },
            },
        });
    
        if (!customer) {
            return res.status(404).json({
                meta: {
                    code: 404,
                    message: 'Customer not found',
                },
            });
        }
    
        // menampilkan data customer
        const result = {
            id: customer.id,
            nik: customer.nik,
            nama: customer.nama,
            email: customer.email,
            alamat: customer.alamat,
            kelurahan: customer.kelurahan,
            kecamatan: customer.kecamatan,
            provinsi: customer.provinsi,
            kota: customer.kota,
            tanggal_lahir: customer.tanggal_lahir,
            jenis_kelamin: customer.jenis_kelamin,
            golongan_darah: customer.golongan_darah,
            status_pernikahan: customer.status_pernikahan,
            rt_rw: customer.rt_rw,
            agama: customer.agama,
            pekerjaan: customer.pekerjaan,
            kewarganegaraan: customer.kewarganegaraan,
            tanggal_berlaku: customer.tanggal_berlaku,
            foto: customer.foto ? customer.foto.toString('base64') : null,
            tanda_tangan: customer.tanda_tangan ? customer.tanda_tangan.toString('base64') : null,
            tanggal_input: customer.tanggal_input,
            broker: customer.CustomerTransaction.map(transaction => transaction.broker)
        };
    
        res.status(200).json({
            meta: {
                code: 200,
                message: 'OK',
            },
            data: result,
        });
    } catch (error) {
        console.error('Error fetching customer:', error);
        res.status(500).json({
            meta: {
                code: 500,
                message: 'Error fetching customer',
            },
            error: error || 'An unexpected error occurred',
        });
    }
}

// Get one customer by name
export const getOneCustomerByName = async (req: Request, res: Response) => {
    const { nama } = req.params;
    try {
        // mencari berdasarkan nama
        const customer = await prisma.customer.findFirst({
            where: {
                nama: {
                    contains: nama,
                    mode: 'insensitive',
                },
            },
            include: {
                CustomerTransaction: {
                    include: {
                        broker: {
                            select: {
                                id: true,
                                nama: true,
                                kode: true,
                            },
                        },
                    },
                },
            },
        });
    
        if (!customer) {
            return res.status(404).json({
                meta: {
                    code: 404,
                    message: 'Customer not found',
                },
            });
        }

        // menampilkan data customer
        const result = {
            id: customer.id,
            nik: customer.nik,
            nama: customer.nama,
            email: customer.email,
            alamat: customer.alamat,
            kelurahan: customer.kelurahan,
            kecamatan: customer.kecamatan,
            provinsi: customer.provinsi,
            kota: customer.kota,
            tanggal_lahir: customer.tanggal_lahir,
            jenis_kelamin: customer.jenis_kelamin,
            golongan_darah: customer.golongan_darah,
            status_pernikahan: customer.status_pernikahan,
            rt_rw: customer.rt_rw,
            agama: customer.agama,
            pekerjaan: customer.pekerjaan,
            kewarganegaraan: customer.kewarganegaraan,
            tanggal_berlaku: customer.tanggal_berlaku,
            foto: customer.foto ? customer.foto.toString('base64') : null,
            tanda_tangan: customer.tanda_tangan ? customer.tanda_tangan.toString('base64') : null,
            tanggal_input: customer.tanggal_input,
            broker: customer.CustomerTransaction.map(transaction => transaction.broker)
        };

        res.status(200).json({
            meta: {
                code: 200,
                message: 'OK',
            },
            data: result,
        });
    } catch (error) {
        console.error('Error fetching customer:', error);
        res.status(500).json({
            meta: {
                code: 500,
                message: 'Error fetching customer',
            },
            error: error || 'An unexpected error occurred',
        });
    }
}

// Get one customer by email
export const getOneCustomerByEmail = async (req: Request, res: Response) => {
    const { email } = req.params;
    try {
        // mencari berdasarkan email
        const customer = await prisma.customer.findFirst({
            where: {
                email: {
                    contains: email,
                },
            },
            include: {
                CustomerTransaction: {
                    include: {
                        broker: {
                            select: {
                                id: true,
                                nama: true,
                                kode: true,
                            },
                        },
                    },
                },
            },
        });
    
        if (!customer) {
            return res.status(404).json({
                meta: {
                    code: 404,
                    message: 'Customer not found',
                },
            });
        }

        // menampilkan data customer
        const result = {
            id: customer.id,
            nik: customer.nik,
            nama: customer.nama,
            email: customer.email,
            alamat: customer.alamat,
            kelurahan: customer.kelurahan,
            kecamatan: customer.kecamatan,
            provinsi: customer.provinsi,
            kota: customer.kota,
            tanggal_lahir: customer.tanggal_lahir,
            jenis_kelamin: customer.jenis_kelamin,
            golongan_darah: customer.golongan_darah,
            status_pernikahan: customer.status_pernikahan,
            rt_rw: customer.rt_rw,
            agama: customer.agama,
            pekerjaan: customer.pekerjaan,
            kewarganegaraan: customer.kewarganegaraan,
            tanggal_berlaku: customer.tanggal_berlaku,
            foto: customer.foto ? customer.foto.toString('base64') : null,
            tanda_tangan: customer.tanda_tangan ? customer.tanda_tangan.toString('base64') : null,
            tanggal_input: customer.tanggal_input,
            broker: customer.CustomerTransaction.map(transaction => transaction.broker)
        };

        res.status(200).json({
            meta: {
                code: 200,
                message: 'OK',
            },
            data: result,
        });
    } catch (error) {
        console.error('Error fetching customer:', error);
        res.status(500).json({
            meta: {
                code: 500,
                message: 'Error fetching customer',
            },
            error: error || 'An unexpected error occurred',
        });
    }
}


// Get all customers
export const getAllCustomers = async (req: Request, res: Response) => {
  try {
      const customers = await prisma.customer.findMany({
          include: {
              CustomerTransaction: {
                  select: {
                      broker: {
                          select: {
                              id: true,
                              nama: true,
                              kode: true,
                          },
                      },
                  },
              },
          },
      });

      // Transform the result to include only necessary broker information
      const result = customers.map(customer => {
          return {
              id: customer.id,
              nik: customer.nik,
              nama: customer.nama,
              email: customer.email,
              alamat: customer.alamat,
              kelurahan: customer.kelurahan,
              kecamatan: customer.kecamatan,
              provinsi: customer.provinsi,
              kota: customer.kota,
              tempat_lahir: customer.tempat_lahir,
              tanggal_lahir: customer.tanggal_lahir,
              jenis_kelamin: customer.jenis_kelamin,
              golongan_darah: customer.golongan_darah,
              status_pernikahan: customer.status_pernikahan,
              rt_rw: customer.rt_rw,
              agama: customer.agama,
              pekerjaan: customer.pekerjaan,
              kewarganegaraan: customer.kewarganegaraan,
              tanggal_berlaku: customer.tanggal_berlaku,
              foto: customer.foto,
              tanda_tangan: customer.tanda_tangan,
              tanggal_input: customer.tanggal_input,
              broker: customer.CustomerTransaction.map(transaction => transaction.broker)
          };
      });

      // get foto and tanda_tangan size
        const fotoBuffer = customers.map(customer => customer.foto ? Buffer.from(customer.foto.toString('base64'), 'base64') : undefined);
        const tandaTanganBuffer = customers.map(customer => customer.tanda_tangan ? Buffer.from(customer.tanda_tangan.toString('base64'), 'base64') : undefined);
        const fotoSize = fotoBuffer.map(buffer => buffer ? buffer.length : 0);
        const tandaTanganSize = tandaTanganBuffer.map(buffer => buffer ? buffer.length : 0);
        const fotoSizeInKB = fotoSize.map(size => size / 1024);
        const tandaTanganSizeInKB = tandaTanganSize.map(size => size / 1024);
        const fotoSizeInMB = fotoSizeInKB.map(size => size / 1024);
        const tandaTanganSizeInMB = tandaTanganSizeInKB.map(size => size / 1024);

      res.status(200).json({
          meta: {
              code: 200,
              message: 'OK',
          },
          data: result,
          size: {
            Foto: `Ukuran foto: (${fotoSizeInKB} KB, ${fotoSizeInMB} MB)`,
            Ttd: `Ukuran tanda tangan: (${tandaTanganSizeInKB} KB, ${tandaTanganSizeInMB} MB)`,
          }
      });
  } catch (error) {
      console.error('Error fetching customers:', error);
      res.status(500).json({
          meta: {
              code: 500,
              message: 'Error fetching customers',
          },
          error: error || 'An unexpected error occurred',
      });
  }
};

export const getCustomerByCustomerTransactionId = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const customer = await prisma.customer.findFirst({
            where: {
                CustomerTransaction: {
                    some: {
                        id: parseInt(id),
                    },
                },
            },
            include: {
                CustomerTransaction: {
                    select: {
                        broker: {
                            select: {
                                id: true,
                                nama: true,
                                kode: true,
                            },
                        },
                    },
                },
            },
        });
    
        if (!customer) {
            return res.status(404).json({
                meta: {
                    code: 404,
                    message: 'Customer not found',
                },
            });
        }

        res.status(200).json({
            meta: {
                code: 200,
                message: 'Customer fetched successfully',
            },
            data: customer,
        });
    } catch (error) {
        console.error('Error fetching customer:', error);
        res.status(500).json({
            meta: {
                code: 500,
                message: 'Error fetching customer',
            },
            error: error || 'An unexpected error occurred',
        });
    }
}

export const getAllCustomersDesktop = async (req: Request, res: Response) => {
    try {
        const customers = await prisma.customer.findMany({
            include: {
                CustomerTransaction: {
                    select: {
                        broker: {
                            select: {
                                nama: true,
                            },
                        },
                    },
                },
            },
        });

        // Transform the result to include only necessary broker information
        const result = customers.map(customer => {
            return {
                id: customer.id,
                nik: customer.nik,
                nama: customer.nama,
                email: customer.email,
                alamat: customer.alamat,
                kelurahan: customer.kelurahan,
                kecamatan: customer.kecamatan,
                provinsi: customer.provinsi,
                kota: customer.kota,
                tempat_lahir: customer.tempat_lahir,
                tanggal_lahir: customer.tanggal_lahir,
                jenis_kelamin: customer.jenis_kelamin,
                golongan_darah: customer.golongan_darah,
                status_pernikahan: customer.status_pernikahan,
                rt_rw: customer.rt_rw,
                agama: customer.agama,
                pekerjaan: customer.pekerjaan,
                kewarganegaraan: customer.kewarganegaraan,
                tanggal_berlaku: customer.tanggal_berlaku,
                foto: customer.foto,
                tanda_tangan: customer.tanda_tangan,
                tanggal_input: customer.tanggal_input,
                // Concatenate broker names into a single string
                broker: customer.CustomerTransaction.map(transaction => transaction.broker?.nama).filter(nama => nama).join(", ")
            };
        });

        res.status(200).json({
            meta: {
                code: 200,
                message: 'OK',
            },
            data: result,
        });
    } catch (error) {
        console.error('Error fetching customers:', error);
        res.status(500).json({
            meta: {
                code: 500,
                message: 'Error fetching customers',
            },
            error: error || 'An unexpected error occurred',
        });
    }
};


// get photo data and convert it to image and base64 and display it
// export const getPhoto = async (req: Request, res: Response): Promise<void> => {
//     const { id } = req.params;
//     try {
//         const customer = await prisma.customer.findUnique({
//             where: {
//                 id: parseInt(id),
//             },
//         });

//         if (!customer) {
//             res.status(404).json({
//                 meta: {
//                     code: 404,
//                     message: 'Customer not found',
//                 },
//             });
//             return;
//         }

//         const base64Photo = customer.tanda_tangan ? customer.tanda_tangan.toString('base64') : null;
//         console.log('base64Photo:', base64Photo);

//         if (base64Photo) {
//             res.status(200).json({
//                 meta: {
//                     code: 200,
//                     message: 'OK',
//                 },
//                 data: {
//                     // display image
//                     image: `<img src="data:image/png;base64,{{ base64Photo }}" alt="Customer Photo">`
//                 },
//             });
//         } else {
//             res.status(200).json({
//                 meta: {
//                     code: 200,
//                     message: 'No photo available',
//                 },
//                 data: null,
//             });
//         }
//     } catch (error) {
//         console.error('Error fetching customer:', error);
//         res.status(500).json({
//             meta: {
//                 code: 500,
//                 message: 'Error fetching customer',
//             },
//             error: error instanceof Error ? error.message : 'An unexpected error occurred',
//         });
//     }
// };
