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
exports.getOneBrokerByCode = exports.getAllBrokers = exports.getOneBroker = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getOneBroker = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const broker = yield prisma.broker.findUnique({
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
    }
    catch (error) {
        console.error('Error fetching broker:', error);
        res.status(500).json({
            meta: {
                code: 500,
                message: 'Internal Server Error',
            },
            error: error || 'An unexpected error occurred',
        });
    }
});
exports.getOneBroker = getOneBroker;
const getAllBrokers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const brokers = yield prisma.broker.findMany();
    try {
        res.status(200).json({
            meta: {
                code: 200,
                message: 'OK',
            },
            data: brokers,
        });
    }
    catch (error) {
        console.error('Error fetching brokers:', error);
        res.status(500).json({
            meta: {
                code: 500,
                message: 'Internal Server Error',
            },
            error: error || 'An unexpected error occurred',
        });
    }
});
exports.getAllBrokers = getAllBrokers;
const getOneBrokerByCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const broker = yield prisma.broker.findMany({
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
    }
    catch (error) {
        console.error('Error fetching broker:', error);
        res.status(500).json({
            meta: {
                code: 500,
                message: 'Internal Server Error',
            },
            error: error || 'An unexpected error occurred',
        });
    }
});
exports.getOneBrokerByCode = getOneBrokerByCode;
//# sourceMappingURL=broker.get.js.map