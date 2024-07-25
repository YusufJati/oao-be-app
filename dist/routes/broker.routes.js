"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const broker_get_1 = require("../controllers/broker/broker.get");
const router = (0, express_1.Router)();
router.get('/brokers', broker_get_1.getAllBrokers);
router.get('/broker/code/:code', broker_get_1.getOneBrokerByCode); // Adjusted the route to avoid conflict
router.get('/broker/id/:id', broker_get_1.getOneBroker); // Adjusted the route to avoid conflict
exports.default = router;
//# sourceMappingURL=broker.routes.js.map