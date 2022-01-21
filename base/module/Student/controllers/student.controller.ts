import { Request, Response } from 'express'
import { CreateStudentDTO, PutStudentDTO } from '../DTO/student.dto'
import { serializeGetAllStudent, serializeGetStudent } from '../serializers/student.serializer'
import StudentService from '../services/student.service'

interface IStudent {
    name: string,
    dateOfBirth: Date,
    gender: boolean,
    created_at: Date,
    updated_at: Date,
    _id: string,
    __v: string
}
export default class StudentController {
    public StudentService: StudentService = new StudentService();

    getAllStudents = async (req: Request, res: Response): Promise<Response> => {
        const object: any = await this.StudentService.getAllStudentService();
        if (object) {
            return res.status(200).json({
                success: true,
                message: 'All students have been loaded successfully!',
                studentLst: [object.map((obj: any) => serializeGetAllStudent(obj))],
            })
        }
        return res.status(400).json({ success: false, message: 'Bad Request' })
    }
    getStudentById = async (req: Request, res: Response): Promise<Response> => {
        const uid = req.params.studentId;
        const object = await this.StudentService.getStudentByIdService(uid);
        if (object) {
            return res.status(200).json({
                success: true,
                message: 'Student has been loaded successfully!',
                student: serializeGetStudent(object)
            })
        }
        return res.status(400).json({ success: false, message: 'Bad Request' })
    }
    createStudent = async (req: Request, res: Response): Promise<Response> => {
        const data: CreateStudentDTO = req.body;
        const object = await this.StudentService.createStudentService(data);
        if (object) {
            return res.status(200).json({
                success: true,
                message: 'Student has been created successfully!',
                createdStudent: serializeGetStudent(object)
            })
        }
        return res.status(400).json({ success: false, message: 'Bad Request' })
    }
    updateStudentById = async (req: Request, res: Response): Promise<Response> => {
        const studentId = req.params.studentId;
        const data: PutStudentDTO = req.body;
        const object = await this.StudentService.updateStudentByIdService(studentId, data);
        if (object) {
            return res.status(200).json({
                success: true,
                message: 'Student has been updated successfully!',
                updatedStudent: serializeGetStudent(object)
            })
        }
        return res.status(400).json({ success: false, message: 'Bad Request' })
    }
    deleteStudentById = async (req: Request, res: Response): Promise<Response> => {
        const uid = req.params.studentId;
        const object = this.StudentService.deleteStudentByIdService(uid);
        if (!object) {
            return res.status(400).json({ success: false, message: 'Bad Request' })
        }
        return res.status(200).json({
            success: true,
            message: 'Student has been deleted successfully!'
        })
    }
}