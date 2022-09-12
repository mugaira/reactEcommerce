import express from 'express';
import {
 authUser,
 getUserProfile,
 registerUser,
 getUsers,
 updateUserProfile,
} from '../controllers/userController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').post(registerUser).get(protect, admin, getUsers);
router.post('/login', authUser);
router
 .route('/profile')
 .get(protect, getUserProfile)
 .put(protect, updateUserProfile);

export default router;
