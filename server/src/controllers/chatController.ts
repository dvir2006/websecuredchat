import { Request, Response } from "express";
import ChatModel from '../models/chat';
import userModel from "../models/user";
import { ObjectId } from "mongodb";

const getChat = async (req: Request, res: Response) => {
    try {
        const { type, senderId, receiverId } = req.body;
        if(!await checkExistingUser(senderId)) throw "";
        if(type === "group") {
            const group = await ChatModel.findById(receiverId);
            if(!group) throw "";
            res.status(200).json(group);
        }
        else if (type === "private") {
            if(!await checkExistingUser(receiverId) ) throw "";
            let chat = await ChatModel.findOne({users:{$all: [senderId,receiverId]}});
            if (!chat) {  
                const newChat = await ChatModel.create({type: "private", users: [senderId,receiverId], messages: []});
                chat = newChat;
            }
            res.status(200).json(chat);
        }
        else throw "";
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
        const { userId, name, users } = req.body;
        if(!await checkExistingGroupUsers(userId, users)) throw "";   
        const chat = await ChatModel.create({
            type: "group",
            name: name,
            admin_uid: userId,
            users: [userId, ...users],
            messages: []
        });
        await chat.save();
        res.status(200).json({message:"success!"});
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const checkExistingGroupUsers = async (senderId: string, users: []) => {
    if(! await checkExistingUser(senderId)) return false;
    for(const user of users) {
        if(! await checkExistingUser(user)) return false;
    }
    return true;
}

const sendMessage = async (req: Request, res: Response) => {
    try {
        const { senderId, receiverId, messageContent,groupId } = req.body;
        if(!await checkExistingUser(senderId)) throw "";     
        if(await checkExistingGroup(groupId))
        {
            const group = await ChatModel.findById(groupId);
            if(group)
            {
                group.messages.push({ sender: senderId, content: messageContent, timestamp: new Date() });
                await group.save();
                res.status(200).json(group);
                return;
            }
        }
        if(!await checkExistingUser(receiverId)) throw ""; 
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
        const { userId } = req.body;
        if(!await checkExistingUser(userId)) throw "";   
        const chats = await ChatModel.find({$and: [ { users: { $in: userId }}, { type: 'group' } ]});
        const formattedChats = chats.map((chat: any) => ({
            name: chat.name,
            uid: chat.id
          }));
        res.status(200).json({chats: formattedChats});
    } catch (error) {
        res.status(200).json({chats: []});
    }
}

const checkExistingGroup = async (groupId: string) => {
    const group = await ChatModel.findById(groupId);
    return !!group;
}

const checkExistingUserInGroup = async (groupId: string, userId: ObjectId) => {
    const group = await ChatModel.findById(groupId);
    if(group)
    {
        const users =  group.users;
        return users.includes(userId);
    }
    
    return false;
}

const checkGroupAdmin = async (groupId: string, userId: ObjectId) => {
    const group = await ChatModel.findById(groupId);
    if(group)
    {
        return group.admin_uid?._id == userId._id;
    }
    
    return false;
}

const addUserToGroup = async (req: Request, res: Response) => {
    try {
        const {groupId, addedUserId, userId} = req.body;
        if(!await checkExistingGroup(groupId)) throw "";
        if(!await checkExistingUser(addedUserId)) throw "";
        if(await checkExistingUserInGroup(groupId, addedUserId)) throw "";
        if(!await checkGroupAdmin(groupId, userId)) throw "";
        const group = await ChatModel.findById(groupId);
        if(!group) throw "";
        else {
            group?.users.push(addedUserId);
            group.save();
        }
        res.status(200).json({ message: "Successfully added user to group" });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}


const removeUserFromGroup = async (req: Request, res: Response) => {
    try {
        const {groupId, removedUserId, userId} = req.body;
        if(!await checkExistingGroup(groupId)) throw "";
        if(!await checkExistingUser(removedUserId)) throw "";
        if(!await checkExistingUserInGroup(groupId, removedUserId)) throw "";
        if(!await checkGroupAdmin(groupId, userId)) throw "";
        const group = await ChatModel.findById(groupId);
        if(!group) throw "";
        else {
            const index = group.users.indexOf(removedUserId);
            group.users.splice(index, 1);
            group.save();
        }
        res.status(200).json({ message: "Successfully added user to group" });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}
export default {getChat, sendMessage, createGroup,getGroups,addUserToGroup,removeUserFromGroup};