import express from 'express'
import { allOrders, cancelOrder, placeOrder, updateStatus, userOrders } from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/auth.js';

const orderRouter = express.Router();

// Admin routes
orderRouter.post('/list',adminAuth, allOrders)
orderRouter.post('/status',adminAuth, updateStatus)

// Payment routes
orderRouter.post('/place',authUser, placeOrder)

// User routes
orderRouter.post('/user-orders',authUser, userOrders);
orderRouter.post('/cancel',authUser, cancelOrder)

export default orderRouter;