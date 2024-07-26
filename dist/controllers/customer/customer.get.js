"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCustomers = exports.getOneCustomer = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Get one customer by id
const getOneCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        // mencari berdasarkan id
        const customer = yield prisma.customer.findUnique({
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
            tanggal_lahir: customer.tanggal_lahir,
            jenis_kelamin: customer.jenis_kelamin,
            golongan_darah: customer.golongan_darah,
            kode_negara: customer.kode_negara,
            status_pernikahan: customer.statuskawin,
            jenis_identitas: customer.jenis_identitas,
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
    }
    catch (error) {
        console.error('Error fetching customer:', error);
        res.status(500).json({
            meta: {
                code: 500,
                message: 'Error fetching customer',
            },
            error: error || 'An unexpected error occurred',
        });
    }
});
exports.getOneCustomer = getOneCustomer;
// Get all customers
const getAllCustomers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customers = yield prisma.customer.findMany({
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
                tanggal_lahir: customer.tanggal_lahir,
                jenis_kelamin: customer.jenis_kelamin,
                golongan_darah: customer.golongan_darah,
                kode_negara: customer.kode_negara,
                status_pernikahan: customer.statuskawin,
                jenis_identitas: customer.jenis_identitas,
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
        res.status(200).json({
            meta: {
                code: 200,
                message: 'OK',
            },
            data: result,
        });
    }
    catch (error) {
        console.error('Error fetching customers:', error);
        res.status(500).json({
            meta: {
                code: 500,
                message: 'Error fetching customers',
            },
            error: error || 'An unexpected error occurred',
        });
    }
});
exports.getAllCustomers = getAllCustomers;
//# sourceMappingURL=customer.get.js.map