"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const student_serializer_1 = require("../serializers/student.serializer");
const student_service_1 = __importDefault(require("../services/student.service"));
class StudentController {
    constructor() {
        this.StudentService = new student_service_1.default();
        this.getAllStudents = async (req, res) => {
            const object = await this.StudentService.getAllStudentService();
            if (object) {
                return res.status(200).json({
                    success: true,
                    message: 'All students have been loaded successfully!',
                    studentLst: [object.map((obj) => (0, student_serializer_1.serializeGetAllStudent)(obj))],
                });
            }
            return res.status(400).json({ success: false, message: 'Bad Request' });
        };
        this.getStudentById = async (req, res) => {
            const uid = req.params.studentId;
            const object = await this.StudentService.getStudentByIdService(uid);
            if (object) {
                return res.status(200).json({
                    success: true,
                    message: 'Student has been loaded successfully!',
                    student: (0, student_serializer_1.serializeGetStudent)(object)
                });
            }
            return res.status(400).json({ success: false, message: 'Bad Request' });
        };
        this.createStudent = async (req, res) => {
            const data = req.body;
            const object = await this.StudentService.createStudentService(data);
            if (object) {
                return res.status(200).json({
                    success: true,
                    message: 'Student has been created successfully!',
                    createdStudent: (0, student_serializer_1.serializeGetStudent)(object)
                });
            }
            return res.status(400).json({ success: false, message: 'Bad Request' });
        };
        this.updateStudentById = async (req, res) => {
            const studentId = req.params.studentId;
            const data = req.body;
            const object = await this.StudentService.updateStudentByIdService(studentId, data);
            if (object) {
                return res.status(200).json({
                    success: true,
                    message: 'Student has been updated successfully!',
                    updatedStudent: (0, student_serializer_1.serializeGetStudent)(object)
                });
            }
            return res.status(400).json({ success: false, message: 'Bad Request' });
        };
        this.deleteStudentById = async (req, res) => {
            const uid = req.params.studentId;
            const object = this.StudentService.deleteStudentByIdService(uid);
            if (!object) {
                return res.status(400).json({ success: false, message: 'Bad Request' });
            }
            return res.status(200).json({
                success: true,
                message: 'Student has been deleted successfully!'
            });
        };
    }
}
exports.default = StudentController;
//# sourceMappingURL=student.controller.js.map