import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

const authCheckMiddleware = (req:Request, res:Response, next:NextFunction) => {
    const jwtKey = process.env.JWT_SECRET || '';
    const token = req.header('Authorization');
  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
  
    try {
      const decodedToken = jwt.verify(token, jwtKey);
      req.body.userId = decodedToken;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
  };

export default authCheckMiddleware;