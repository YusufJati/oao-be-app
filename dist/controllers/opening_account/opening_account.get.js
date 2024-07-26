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
exports.getAllOpeningAccounts = exports.getOneOpeningAccount = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getOneOpeningAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const openingAccount = yield prisma.openingAccount.findUnique({
            where: {
                id: parseInt(id),
            },
        });
        res.status(200).json({
            meta: {
                code: 200,
                message: 'OK',
            },
            data: openingAccount,
        });
    }
    catch (error) {
        console.error('Error fetching opening account:', error);
        res.status(500).json({
            meta: {
                code: 500,
                message: 'Error fetching opening account',
            },
            error: error || 'An unexpected error occurred',
        });
    }
});
exports.getOneOpeningAccount = getOneOpeningAccount;
const getAllOpeningAccounts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const openingAccounts = yield prisma.openingAccount.findMany();
        res.status(200).json({
            meta: {
                code: 200,
                message: 'OK',
            },
            data: openingAccounts,
        });
    }
    catch (error) {
        console.error('Error fetching opening accounts:', error);
        res.status(500).json({
            meta: {
                code: 500,
                message: 'Error fetching opening accounts',
            },
            error: error || 'An unexpected error occurred',
        });
    }
});
exports.getAllOpeningAccounts = getAllOpeningAccounts;
//# sourceMappingURL=opening_account.get.js.map