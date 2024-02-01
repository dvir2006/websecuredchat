import express, { Request, Response } from 'express';
import authController from '../controllers/authController';
import authCheckMiddleware from '../middleware/authMiddleware';

const authRouter = express.Router();
authRouter.post('/register', authController.registerUser);

authRouter.post('/login', authController.loginUser);

authRouter.get('/check-user',authCheckMiddleware , authController.checkUserAuth);

authRouter.get('/all-users', authCheckMiddleware, authController.getAllUsers);

authRouter.post('/verify-otp', authController.verifyOTP);

export default authRouter;
