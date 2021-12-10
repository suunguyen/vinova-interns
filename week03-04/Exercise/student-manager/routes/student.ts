import express from 'express';
import StudentController from '../controllers/StudentController';

const studentRouter = express.Router();
const studentController = new StudentController();

studentRouter.get('/all-student', studentController.getAllStudents);
studentRouter.post('/new-student', studentController.addStudent);
studentRouter.put('/update-student/:id', studentController.updateStudentById);
studentRouter.delete('/delete-student/:id', studentController.deleteStudentById);

export default studentRouter;
