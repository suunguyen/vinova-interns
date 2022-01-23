import Joi from "joi"

export default class UserValidation {
    checkoutSchema = Joi.object({
        details: Joi.object().required(),
        total_price: Joi.number().required(),
        delivery_fee: Joi.number().required()
    })
}