import express from 'express';
import { orderList } from '../controllers/orderFetchController.js';
import { createOrder } from '../controllers/orderCreateController.js';
import { validateMiddleware } from '../middlewares/validate.js';
import { verifyToken } from '../middlewares/authVerifyMiddleware.js';
import {orderValidator} from '../validators/orderCreateValidator.js';
import {productListFromProductMS} from "../controllers/productFetchFromProductServiceController.js";

const router = express.Router();

router.get('/',verifyToken,validateMiddleware, orderList); // 👈 protected
router.post('/', verifyToken,orderValidator,validateMiddleware, createOrder); // 👈 protected
router.get('/products', verifyToken,validateMiddleware, productListFromProductMS); // 👈 protected

export default router;
