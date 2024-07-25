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
        const customer = yield prisma.customer.findUnique({
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
    }
    catch (error) {
        console.error('Error fetching customer:', error);
        res.status(500).json({
            meta: {
                code: 500,
                message: 'Internal Server Error',
            },
            error: error || 'An unexpected error occurred',
        });
    }
});
exports.getOneCustomer = getOneCustomer;
// Get all customers
const getAllCustomers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customers = yield prisma.customer.findMany();
        res.status(200).json({
            meta: {
                code: 200,
                message: 'OK',
            },
            data: customers,
        });
    }
    catch (error) {
        console.error('Error fetching customers:', error);
        res.status(500).json({
            meta: {
                code: 500,
                message: 'Internal Server Error',
            },
            error: error || 'An unexpected error occurred',
        });
    }
});
exports.getAllCustomers = getAllCustomers;
//# sourceMappingURL=customer.get.js.map