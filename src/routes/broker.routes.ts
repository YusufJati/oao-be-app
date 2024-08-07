import { Router } from 'express';
import { getAllBrokers, getOneBrokerByCode, getOneBroker, sendBrokerData, getBrokerData, receiveBrokerData } from '../controllers/broker/broker.get';

const router = Router();

router.get('/brokers', getAllBrokers);
router.get('/broker/code/:code', getOneBrokerByCode);  // Adjusted the route to avoid conflict
router.get('/broker/id/:id', getOneBroker);  // Adjusted the route to avoid conflict

// /broker/data?url=http://localhost:3000/broker&broker_ids=1,2,3
router.post('/broker/send', sendBrokerData);
router.post('/broker/receive', receiveBrokerData);
router.get('/broker/get', getBrokerData);


export default router;
