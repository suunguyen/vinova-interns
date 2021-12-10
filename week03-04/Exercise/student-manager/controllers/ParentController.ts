import Parent from '../models/Parent';
import {
    Request,
    Response
} from 'express';

export default class ParentController {
    /* tslint:disable:no-unused-variable */
    async getAllParents(req: Request, res: Response): Promise < Response > {
        try {
            const parents = await Parent.find();
            if(parents){
                return res.status(200).json({ success: true, parents})
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

    async addParent(req: Request, res: Response): Promise < Response > {
        const {name, students} = req.body;
        try {
            const newParent = new Parent({name, students});
            if(await newParent.save()){
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