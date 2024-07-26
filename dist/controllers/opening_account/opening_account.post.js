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
exports.createOpeningAccount = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createOpeningAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        // get customer id from customer transaction
        const openingAccount = yield prisma.openingAccount.create({
            data: {
                customerTransaction: { connect: { id: data.customerTransactionId } },
                alamat_perusahaan: data.alamat_perusahaan,
            },
        });
        res.status(201).json({
            meta: {
                code: 201,
                message: 'Created',
            },
            data: openingAccount,
        });
    }
    catch (error) {
        console.error('Error creating opening account:', error);
        res.status(500).json({
            meta: {
                code: 500,
                message: 'Error creating opening account',
            },
            error: error || 'An unexpected error occurred',
        });
    }
});
exports.createOpeningAccount = createOpeningAccount;
//# sourceMappingURL=opening_account.post.js.map