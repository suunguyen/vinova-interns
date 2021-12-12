"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const student_controller_1 = __importDefault(require("../controllers/student.controller"));
const studentvalidation_middleware_1 = require("../../../middlewares/studentvalidation.middleware");
const studentRouter = express_1.default.Router();
const studentController = new student_controller_1.default();
studentRouter.get('/all-student', studentController.getAllStudents);
studentRouter.post('/new-student', studentvalidation_middleware_1.verifyBody, studentController.createStudent);
studentRouter.get('/:studentId', studentController.getStudentById);
studentRouter.put('/:studentId', studentController.updateStudentById);
studentRouter.delete('/:studentId', studentController.deleteStudentById);
exports.default = studentRouter;
//# sourceMappingURL=student.route.js.map