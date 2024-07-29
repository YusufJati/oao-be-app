import { Router } from 'express';
import * as getCustomerController from '../controllers/customer/customer.get';
import * as postCustomerController from '../controllers/customer/customer.post';

const router = Router();

// GET
router.get('/customers', getCustomerController.getAllCustomers);
router.get('/customer/:id', getCustomerController.getOneCustomer);
router.get('/customer/nik/:nik', getCustomerController.getOneCustomerByNik);
router.get('/customer/email/:email', getCustomerController.getOneCustomerByEmail);
router.get('/customer/name/:name', getCustomerController.getOneCustomerByName);
router.get('/customer/transaction/:id', getCustomerController.getCustomerByCustomerTransactionId);

// POST
router.post('/customer', postCustomerController.createCustomer);

export default router;