import { Router } from 'express';
import * as getCustomerController from '../controllers/customer/customer.get';
import * as postCustomerController from '../controllers/customer/customer.post';

const router = Router();

router.get('/customers', getCustomerController.getAllCustomers);
router.get('/customer/:id', getCustomerController.getOneCustomer);
router.post('/customer', postCustomerController.createCustomer);

export default router;