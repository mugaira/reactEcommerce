import express from 'express';
import {
 deleteProduct,
 getProductById,
 getProducts,
} from '../controllers/productController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Routes Handler

router.route('/').get(getProducts);
router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct);

export default router;
