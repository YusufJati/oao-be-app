"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var express_1 = __importDefault(require("express"));
var http_errors_1 = __importDefault(require("http-errors"));
var prisma = new client_1.PrismaClient();
var app = (0, express_1.default)();
var PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
// TODO: Routing aplikasi akan kita tulis di sini
// handle 404 error
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
app.listen(PORT, function () {
    return console.log("\u26A1\uFE0F[server]: Server is running at https://localhost:3000");
});
//# sourceMappingURL=index.js.map