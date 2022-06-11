import express from 'express';
import { addOrderItems, getMyOrders, getOrderById, getOrders, updateOrderToDelivered, updateOrderToPaid } from '../controllers/orderController.js';
import {admin, protect} from '../middleware/authMiddleware.js';

const router = express.Router();



// private route 
router.post('/' , protect ,  addOrderItems)
router.get('/myorders' , protect ,  getMyOrders)
router.get('/:id' , protect ,  getOrderById)
router.put('/:id/pay' , protect ,  updateOrderToPaid)


// private admin route
router.get('/' , protect , admin ,  getOrders)
router.put('/:id/deliver' , protect , admin ,  updateOrderToDelivered)




export default router; 