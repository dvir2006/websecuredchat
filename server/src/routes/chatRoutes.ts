import express, { Request, Response } from 'express';
import chatController from '../controllers/chatController';
import authCheckMiddleware from '../middleware/authMiddleware';

const chatRouter = express.Router();
chatRouter.post('/get-chat',authCheckMiddleware, chatController.getChat);

chatRouter.post('/send-message',authCheckMiddleware, chatController.sendMessage);

chatRouter.post('/create-group',authCheckMiddleware, chatController.createGroup);

chatRouter.get('/get-groups',authCheckMiddleware, chatController.getGroups);


export default chatRouter;
