"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyBody = void 0;
const student_validation_1 = __importDefault(require("../module/Student/validations/student.validation"));
const verifyBody = (req, res, next) => {
    try {
        const studentValidator = new student_validation_1.default();
        const validated = studentValidator.studentSchema.validate(req.body);
        req.body = validated;
        next();
    }
    catch (error) {
        console.log(error);
    }
};
exports.verifyBody = verifyBody;
//# sourceMappingURL=studentvalidation.middleware.js.map