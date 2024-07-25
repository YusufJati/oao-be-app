import { Router } from 'express';
import * as getOpeningAccountController from '../controllers/opening_account/opening_account.get';
import * as postOpeningAccountController from '../controllers/opening_account/opening_account.post';

const router = Router();

router.get('/opening_accounts', getOpeningAccountController.getAllOpeningAccounts);
router.get('/opening_account/:id', getOpeningAccountController.getOneOpeningAccount);
router.post('/opening_account', postOpeningAccountController.createOpeningAccount);

export default router;