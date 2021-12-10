import Class from '../models/Class';
import {
    Request,
    Response
} from 'express';

export default class ClassController {
    /* tslint:disable:no-unused-variable */
    async getAllClasses(req: Request, res: Response): Promise < Response > {
        try {
            const classes = await Class.find().populate('students', 'name');
            if(classes){
                return res.status(200).json({ success: true, classes})
            }
            return res.status(400).json({ success: false});
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error'
            })
        }
    }

    async addClass(req: Request, res: Response): Promise < Response > {
        const {name, students} = req.body;
        try {
            const newClass = new Class({name, students});
            if(await newClass.save()){
                return res.status(200).json({
                    success: true
                })
            }
            return res.status(400).json({
                success: false,
                message: 'Bad Request'
            })
        } catch (error) {
           return res.status(500).json({
               success: false,
               message: 'Internal Server Error'
           }) 
        }
    }
}