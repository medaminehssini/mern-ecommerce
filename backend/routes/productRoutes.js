import express from 'express';
import { createProduct, createProductReview, deleteProduct, getProductById, getProducts, getTopProduct, updateProduct } from '../controllers/productController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();


router.get('/top'  ,  getTopProduct)
router.route('/').get(getProducts)
router.route('/:id').get(getProductById)



// private  
router.post('/:id/reviews' , protect  ,  createProductReview)


// private  admin
router.delete('/:id' , protect , admin ,  deleteProduct)
router.put('/:id' , protect , admin ,  updateProduct)
router.post('/' , protect , admin ,  createProduct)


export default router; 