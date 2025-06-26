import express from 'express';
import { orderList } from '../controllers/orderFetchController.js';
import { createOrder } from '../controllers/orderCreateController.js';
import { validateMiddleware } from '../middlewares/validate.js';
import { verifyToken } from '../middlewares/authVerifyMiddleware.js';
import {orderValidator} from '../validators/orderCreateValidator.js';

const router = express.Router();

router.get('/',verifyToken,validateMiddleware, orderList); // 👈 protected
router.post('/', verifyToken,orderValidator,validateMiddleware, createOrder); // 👈 protected

export default router;
