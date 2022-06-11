import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { addWishlist, getWishlist } from '../controllers/wishlitcontroller.js';
const router = express.Router();


// private route 
router.post('/:id' , protect ,  addWishlist)
router.get('/' , protect ,  getWishlist)



export default router; 