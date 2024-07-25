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
exports.createCustomer = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get from interface
    const data = req.body;
    try {
        const customer = yield prisma.customer.create({
            data: {
                nik: data.nik,
                nama: data.nama,
                email: data.email,
                alamat: data.alamat,
                kelurahan: data.kelurahan,
                kecamatan: data.kecamatan,
                provinsi: data.provinsi,
                tanggal_lahir: data.tanggal_lahir,
                jenis_kelamin: data.jenis_kelamin,
                golongan_darah: data.golongan_darah,
                kode_negara: data.kode_negara,
                status_pernikahan: data.status_pernikahan,
                jenis_identitas: data.jenis_identitas,
                rt_rw: data.rt_rw,
                agama: data.agama,
                pekerjaan: data.pekerjaan,
                kewarganegaraan: data.kewarganegaraan,
                tanggal_berlaku: data.tanggal_berlaku,
                foto: data.foto,
                tanda_tangan: data.tanda_tangan,
                tanggal_input: data.tanggal_input,
            },
        });
        res.status(201).json({
            meta: {
                code: 201,
                message: 'Created',
            },
            data: customer,
        });
    }
    catch (error) {
        console.error('Error creating customer:', error);
        res.status(500).json({
            meta: {
                code: 500,
                message: 'Internal Server Error',
            },
            error: error || 'An unexpected error occurred',
        });
    }
});
exports.createCustomer = createCustomer;
//# sourceMappingURL=customer.post.js.map