import express from 'express';
import StudentController from '../controllers/student.controller';

const studentRouter = express.Router();
const studentController = new StudentController();

studentRouter.get('/all-student', studentController.getAllStudents);
studentRouter.post('/new-student', studentController.createStudent);
studentRouter.get('/:studentId', studentController.getStudentById);
studentRouter.put('/:studentId', studentController.updateStudentById);
studentRouter.delete('/:studentId', studentController.deleteStudentById);

export default studentRouter;