"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateAPIKey = void 0;
exports.notFound = notFound;
exports.errorHandler = errorHandler;
const client_1 = require("@prisma/client");
const client = new client_1.PrismaClient();
function notFound(req, res, next) {
    res.status(404);
    const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
    next(error);
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function errorHandler(err, req, res, next) {
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
    });
}
const authenticateAPIKey = (req, res, next) => {
    const apiKey = req.headers["x-api-key"];
    if (apiKey && apiKey === process.env.API_KEY) {
        next();
    }
    else {
        res.status(401).json({
            message: "Unauthorized access."
        });
    }
};
exports.authenticateAPIKey = authenticateAPIKey;
//# sourceMappingURL=middlewares.js.map