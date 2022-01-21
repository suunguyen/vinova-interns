import Joi from "joi"

export default class StudentValidator {
    studentSchema = Joi.object({
        name: Joi.string().min(1).max(10).required(),
        dateOfBirth: Joi.date().required(),
        gender: Joi.boolean().required(),
    })
}