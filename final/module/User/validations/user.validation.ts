import Joi from "joi"

export default class UserValidation {
    loginSchema = Joi.object({
        email: Joi.string().email().lowercase().required(),
        password: Joi.string().min(5).required()
    })
    registerSchema = Joi.object({
        fullName: Joi.string().required(),
        email: Joi.string().email().lowercase().required(),
        password: Joi.string().min(5).required()
    })
    updateInfo = Joi.object({
        fullName: Joi.string().required(),
        displayName: Joi.string().required(),
        oldPassword: Joi.string(),
        password: Joi.string().min(5)
    })
    address = Joi.object({
        fullName: Joi.string().required(),
        phone: Joi.string().required(),
        city: Joi.string().required(),
        district: Joi.string().required(),
        ward: Joi.string().required(),
        apartmentNumber: Joi.string().required()
    })
}