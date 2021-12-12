import Student from '../models/student.model'

export default class StudentService {
    getAllStudentService = () => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await Student.find();
                if (response) {
                    resolve(response);
                }
            } catch (error) {
                reject(error);
            }
        })
    }

    getStudentByIdService = (uid: string) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await Student.findOne({ _id: uid });
                if (response) {
                    resolve(response)
                }
            } catch (error) {
                reject(error);
            }
        })
    }

    createStudentService = (student: any) => {
        return new Promise(async (resolve, reject) => {
            try {
                const newStudent = new Student({
                    name: student.name,
                    dateOfBirth: student.dateOfBirth,
                    gender: student.gender
                })

                if (await newStudent.save()) {
                    resolve(newStudent);
                }
            } catch (error) {
                reject(error);
            }
        })
    }
    deleteStudentByIdService = (uid: string) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await Student.findOneAndDelete({ _id: uid });
                if (response) {
                    resolve(response)
                }
            } catch (error) {
                reject(error);
            }
        })
    }

    updateStudentByIdService = (uid: string, student: any) => {
        return new Promise(async (resolve, reject) => {
            try {
                const updatedStudent = {
                    name: student.name,
                    dateOfBirth: student.dateOfBirth,
                    gender: student.gender,
                    updated_at: Date.now()
                }

                const isSuccess = await Student.findOneAndUpdate({ _id: uid }, updatedStudent, { new: true });
                if(isSuccess) {
                    resolve(updatedStudent);
                }
            } catch (error) {
                reject(error);
            }
        })
    }
}
