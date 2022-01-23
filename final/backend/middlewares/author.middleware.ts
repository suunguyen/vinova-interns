import { Request, Response, NextFunction } from 'express'
const jwt = require('jsonwebtoken');

interface IAuthorizeRequest extends Request {
    userId: string;
}
export function verifyToken(req: IAuthorizeRequest, res: Response, next: NextFunction) {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        res.status(401).json({
            success: false,
            message: 'Not Authorized',
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.userId = decoded;
        next();
    } catch (error) {
        console.log(error);
        res.status(403).json({ success: false, message: 'Forbidden' });
    }
}