import Joi from 'joi'
import { Request, Response, NextFunction } from 'express'
import StudentValidator from '../module/Student/validations/student.validation';

export const verifyBody = (req: Request, res: Response, next: NextFunction) => {
    try {
        const studentValidator = new StudentValidator();
        const validated = studentValidator.studentSchema.validate(req.body);
        req.body = validated
        next()
    } catch (error) {
        console.log(error);
    }
}