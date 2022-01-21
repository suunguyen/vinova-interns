
import UserValidation from '../module/User/validations/user.validation'
import { Request, Response, NextFunction } from 'express'

const userValidation = new UserValidation();

export async function loginValidation(req: Request, res: Response, next: NextFunction) {
    try {
        const validated = await userValidation.loginSchema.validateAsync(req.body)
        req.body = validated
        next()
    } catch (err) {
        res.status(400).json({
            success: false,
            message: 'Không đúng định dạng, vui lòng kiểm tra lại!'
        })
    }
}

export async function registerValidation(req: Request, res: Response, next: NextFunction) {
    try {
        const validated = await userValidation.registerSchema.validateAsync(req.body)
        req.body = validated
        next()
    } catch (err) {
        res.status(400).json({
            success: false,
            message: 'Không đúng định dạng, vui lòng kiểm tra lại!'
        })
    }
}