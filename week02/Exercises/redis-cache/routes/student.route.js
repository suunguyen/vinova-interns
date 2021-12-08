const express = require('express');
const studentController = require('../controllers/student.controller');

const studentRouter = express.Router();

studentRouter.get('/all-student', studentController.getAllStudents);
studentRouter.post('/new-student', studentController.createStudent);
studentRouter.get('/:studentId', studentController.getStudentById);
studentRouter.put('/:studentId', studentController.updateStudentById);
studentRouter.delete('/:studentId', studentController.deleteStudentById);

module.exports = studentRouter;