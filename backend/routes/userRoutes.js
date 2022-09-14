import express from 'express';
import {
 authUser,
 getUserProfile,
 registerUser,
 getUsers,
 updateUserProfile,
 deleteUser,
 updateUser,
 getUserById,
} from '../controllers/userController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').post(registerUser).get(protect, admin, getUsers);
router.post('/login', authUser);
router
 .route('/profile')
 .get(protect, getUserProfile)
 .put(protect, updateUserProfile);

router
 .route('/:id')
 .delete(protect, admin, deleteUser)
 .put(protect, admin, updateUser)
 .get(protect,admin,getUserById);

export default router;
