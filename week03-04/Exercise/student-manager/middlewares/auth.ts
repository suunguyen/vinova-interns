require('dotenv').config();
import jwt from 'jsonwebtoken'
import {Request, Response, NextFunction} from 'express';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized',
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || "");
        // req.userId = decoded.userId;
        if(decoded){
            next();
            return res.status(200).json({
                success: true
            })
        }
        return res.status(400).json({
            success: false, message: 'Bad Request'
        })
    } catch (error) {
        console.log(error);
        return res.status(403).json({ 
            success: false, message: 'Unauthorized'
        })
    }
}

export default verifyToken;