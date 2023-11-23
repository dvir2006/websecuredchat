import { Request, Response } from "express";
import ChatModel from '../models/chat';
import userModel from "../models/user";

const getChat = async (req: Request, res: Response) => {
    try {
        const { type, senderId, receiverId } = req.body;
        if (type !== "private") throw "";
        if(!await checkExistingUsers(senderId, receiverId)) throw "";
        let chat = await ChatModel.findOne({users:{$all: [senderId,receiverId]}});
        if (!chat) {  
            const newChat = await ChatModel.create({type: "private", users: [senderId,receiverId], messages: []});
            chat = newChat;
        }
        res.status(200).json(chat);
    } catch (error) 
    {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const checkExistingUsers = async (senderId: string, receiverId: string) => {
    const sender = await userModel.findById(senderId);
    const receiver = await userModel.findById(receiverId);
    return !!sender && !!receiver;
}

const sendMessage = async (req: Request, res: Response) => {
    try {
        const { senderId, receiverId, messageContent } = req.body;
        let chat = await ChatModel.findOne({ users: { $all: [senderId, receiverId] } });
        if (!chat) {
            chat = await ChatModel.create({
                type: "private",
                users: [senderId, receiverId],
                messages: [{ sender: senderId, content: messageContent }]
            });
        } else {
            chat.messages.push({ sender: senderId, content: messageContent, timestamp: new Date() });
            await chat.save();
        }
        res.status(200).json(chat);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

export default {getChat, sendMessage};