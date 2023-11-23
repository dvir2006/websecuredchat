import { Request, Response } from "express";
import UserModel from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerUser = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    try {
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Please fill all the requiered fields <3' });
        }
        const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }
    
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {   
            return res.status(400).json({ message: 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one digit' });
        }
        const saltRounds = await bcrypt.genSalt(10); 
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = new UserModel({
            username,
            email,
            password: hashedPassword,
        });
        await newUser.save();
        res.status(201).json({ message: 'Registration successful' });
        } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
        }
  };

export const loginUser = async (req: Request, res: Response) => 
{
    const { email, password } = req.body;
  
    try {
        const user = await UserModel.findOne({ email });
        const jwtKey = process.env.JWT_SECRET || '';

        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
    
        if (!passwordMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({ _id: user._id }, jwtKey, {expiresIn: '3d'});
        
        res.header('auth-token', token).json({ token, message: 'Login successful', userId: user._id});
        } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await UserModel.find({}, '-password');

        res.status(200).json(users);
    } catch (error) 
    {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const checkUserAuth = async (req: Request, res: Response) => {
    try {
        const { userId } = req.body;
        res.status(200).json({ message: 'Valid user', userId: userId });
    } catch (error) 
    {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export default {registerUser, loginUser, getAllUsers,checkUserAuth};