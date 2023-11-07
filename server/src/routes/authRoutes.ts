import express, { Request, Response } from 'express';
import authController from '../controllers/authController';

const router = express.Router();
router.post('/register', authController.registerUser);

router.post('/login', authController.loginUser);

router.get('/all-users', authController.getAllUsers);

export default router;
