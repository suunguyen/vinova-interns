"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const student_model_1 = __importDefault(require("../models/student.model"));
class StudentService {
    constructor() {
        this.getAllStudentService = () => {
            return new Promise(async (resolve, reject) => {
                try {
                    const response = await student_model_1.default.find();
                    if (response) {
                        resolve(response);
                    }
                }
                catch (error) {
                    reject(error);
                }
            });
        };
        this.getStudentByIdService = (uid) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const response = await student_model_1.default.findOne({ _id: uid });
                    if (response) {
                        resolve(response);
                    }
                }
                catch (error) {
                    reject(error);
                }
            });
        };
        this.createStudentService = (student) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const newStudent = new student_model_1.default({
                        name: student.name,
                        dateOfBirth: student.dateOfBirth,
                        gender: student.gender
                    });
                    if (await newStudent.save()) {
                        resolve(newStudent);
                    }
                }
                catch (error) {
                    reject(error);
                }
            });
        };
        this.deleteStudentByIdService = (uid) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const response = await student_model_1.default.findOneAndDelete({ _id: uid });
                    if (response) {
                        resolve(response);
                    }
                }
                catch (error) {
                    reject(error);
                }
            });
        };
        this.updateStudentByIdService = (uid, student) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const updatedStudent = {
                        name: student.name,
                        dateOfBirth: student.dateOfBirth,
                        gender: student.gender,
                        updated_at: Date.now()
                    };
                    const isSuccess = await student_model_1.default.findOneAndUpdate({ _id: uid }, updatedStudent, { new: true });
                    if (isSuccess) {
                        resolve(updatedStudent);
                    }
                }
                catch (error) {
                    reject(error);
                }
            });
        };
    }
}
exports.default = StudentService;
//# sourceMappingURL=student.service.js.map