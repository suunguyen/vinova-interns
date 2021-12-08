const Student = require('../models/student.model');
const redis = require('redis');

const redisClient = redis.createClient(6379);
redisClient.connect();

class StudentController {
    async getAllStudents(req, res) {
        try {
            redisClient.get("students", async (err, response) => {
                if (err) {
                    console.log(err);
                    throw err;
                }
                if (response) {
                    return res.status(200).json(JSON.parse(response));
                } else {
                    const students = await Student.find();
                    console.log(students);
                    redisClient.set("students", 6000, JSON.stringify(students));
                    return res.status(200).json({
                        success: true,
                        data: students,
                    });
                }
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
            });
        }
    }

    async getStudentById(req, res) {
        try {
            const student = await Student.find({ _id: req.params.studentId });
            if (student) {
                return res.status(200).json({
                    success: true,
                    data: student,
                });
            }
            return res.status(400).json({
                success: false,
                message: "Bad Request",
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
            });
        }
    }

    async createStudent(req, res) {
        const { name, dateOfBirth, gender } = req.body;
        try {
            const newStudent = new Student({
                name,
                dateOfBirth,
                gender
            });

            if (await newStudent.save()) {
                return res.status(200).json({ success: true });
            }

            return res.status(400).json({
                success: false,
                message: "Bad Request",
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
            });
        }
    }

    async updateStudentById(req, res) {
        const { name, dateOfBirth, gender } = req.body;
        try {
            const updateStudent = {
                name,
                dateOfBirth,
                gender,
                updated_at: Date.now(),
            };
            const condition = {
                _id: req.params.studentId,
            };
            const student = await Student.findOneAndUpdate(condition, updateStudent, {
                new: true,
            });
            if (student) {
                return res.status(200).json({
                    success: true,
                    student,
                });
            }
            return res.status(400).json({
                success: false,
                message: "Bad Request",
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
            });
        }
    }

    async deleteStudentById(req, res) {
        try {
            const condition = {
                _id: req.params.studentId,
            };

            const response = await Student.findOneAndDelete(condition);
            if (response) {
                return res.status(200).json({ success: true });
            }
            return res.status(400).json({
                success: false,
                message: "Bad Request",
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
            });
        }
    }
}

module.exports = new StudentController();