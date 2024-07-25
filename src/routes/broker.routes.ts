import { Router } from 'express';
import { getAllBrokers, getOneBrokerByCode, getOneBroker } from '../controllers/broker/broker.get';

const router = Router();

router.get('/brokers', getAllBrokers);
router.get('/broker/code/:code', getOneBrokerByCode);  // Adjusted the route to avoid conflict
router.get('/broker/id/:id', getOneBroker);  // Adjusted the route to avoid conflict

export default router;
