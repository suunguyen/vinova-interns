import Student from '../models/Student';
import { Request, Response } from 'express';

    /* tslint:disable:no-unused-variable */
export default class StudentController {
    async getAllStudents(req: Request, res: Response): Promise<Response> {
        try {
            const students = await Student.find().populate('auth', 'username').exec();
            if (students) {
                return res.status(200).json({
                    success: true,
                    students
                })
            }
            return res.status(400).json({
                success: false,
                message: 'Bad Request'
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error'
            })
        }
    }

    async getStudentById(req: Request, res: Response): Promise<Response>{
        try {
            const student = await Student.find({_id: req.params.id});
            if(student){
                return res.status(200).json({
                    success: true,
                    student
                })
            }
            return res.status(400).json({
                success: false,
                message: 'Bad Request'
            })           
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error'
            })
        }
    }

    async addStudent(req: Request, res: Response): Promise<Response> {

        const { name, dateOfBirth, gender, parents, auth, classes } = req.body;
        try {
            const newStudent = new Student({
                name,
                dateOfBirth,
                gender,
                parents,
                auth,
                classes
            })

            if (await newStudent.save()) {
                return res.status(200).json({ success: true })
            }

            return res.status(400).json({
                success: false,
                message: 'Bad Request'
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error'
            })
        }
    }

    async updateStudentById(req: Request, res: Response): Promise<Response> {
        const { name, dateOfBirth, gender, parents, auth, classes } = req.body;
        try {
            const updateStudent = {
                name,
                dateOfBirth,
                gender,
                parents,
                auth,
                classes,
                updated_at: Date.now()
            }
            const condition = {
                _id: req.params.id
            }
            const student = await Student.findOneAndUpdate(condition, updateStudent, {new: true});
            if (student) {
                return res.status(200).json({
                    success: true,
                    student
                })
            }
            return res.status(400).json({
                success: false,
                message: 'Bad Request'
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error'
            })
        }
    }

    async deleteStudentById(req: Request, res: Response): Promise<Response> {
        try {
            const condition = {
                _id: req.params.id
            }

            const response = await Student.findOneAndDelete(condition);
            if(response){
                return res.status(200).json({ success: true});
            }
            return res.status(400).json({
                success: false,
                message: 'Bad Request'
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error'
            })
        }
    }
}