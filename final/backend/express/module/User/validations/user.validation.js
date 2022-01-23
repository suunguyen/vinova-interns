"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
class UserValidation {
    constructor() {
        this.loginSchema = joi_1.default.object({
            email: joi_1.default.string().email().lowercase().required(),
            password: joi_1.default.string().min(5).required()
        });
        this.registerSchema = joi_1.default.object({
            fullName: joi_1.default.string().required(),
            email: joi_1.default.string().email().lowercase().required(),
            password: joi_1.default.string().min(5).required()
        });
    }
}
exports.default = UserValidation;
//# sourceMappingURL=user.validation.js.map