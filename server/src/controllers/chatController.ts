import { Request, Response } from "express";
import ChatModel from '../models/chat';


const getChat = async (req: Request, res: Response) => {
    try {
        const { type, senderId, reciverId } = req.body;
        if (type !== "private") throw "";
        const chat = await ChatModel.findOne({users:{$all: [senderId,reciverId]}});
        if (!chat) throw "";
        res.status(200).json(chat);
    } catch (error) 
    {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const sendMessage = async (req: Request, res: Response) => {
    res.status(500).json({ message: 'Internal server error' });
}

export default {getChat, sendMessage};