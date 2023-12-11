import { Request, Response } from "express";
import ChatModel from '../models/chat';
import userModel from "../models/user";

const getChat = async (req: Request, res: Response) => {
    try {
        const { type, senderId, receiverId } = req.body;
        if(!await checkExistingUser(senderId)) throw "";
        if(type === "group") {
            const group = await ChatModel.findById(receiverId);
            if(!group) throw "";
            res.status(200).json(group);
        }
        if (type !== "private") throw "";
        if(!await checkExistingUser(receiverId) ) throw "";
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

const checkExistingUser = async (user: string) => {
    const u = await userModel.findById(user);
    return !!u;
}

const createGroup = async (req: Request, res: Response) => {
    try {
        const { adminId, name, users } = req.body;
        if(!await checkExistingGroupUsers(adminId, users)) throw "";   
        const chat = await ChatModel.create({
            type: "group",
            name: name,
            admin_uid: adminId,
            users: [adminId, ... users],
            messages: []
        });
        await chat.save();
        res.status(200).json({message:"success!"});
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const checkExistingGroupUsers = async (senderId: string, users: string) => {
    if(! await checkExistingUser(senderId)) return false;
    for(const user of users) {
        if(! await checkExistingUser(user)) return false;
    }
    return true;
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


const getGroups = async (req: Request, res: Response) => {
    try {
        const { userId} = req.body;
        if(!await checkExistingUser(userId)) throw "";   
        const chats = await ChatModel.find({$and: [ { users: { $in: userId } }, { type: 'group' } ]});
        const formattedChats = chats.map(chat => ({
            name: chat.name,
            uid: chat.id
          }));
        res.status(200).json({chats: formattedChats});
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}


export default {getChat, sendMessage, createGroup,getGroups};