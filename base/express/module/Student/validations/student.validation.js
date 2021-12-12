"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
class StudentValidator {
    constructor() {
        this.studentSchema = joi_1.default.object({
            name: joi_1.default.string().min(1).max(10).required(),
            dateOfBirth: joi_1.default.date().required(),
            gender: joi_1.default.boolean().required(),
        });
    }
}
exports.default = StudentValidator;
//# sourceMappingURL=student.validation.js.map