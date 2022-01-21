"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerValidation = exports.loginValidation = void 0;
const user_validation_1 = __importDefault(require("../module/User/validations/user.validation"));
const http_errors_1 = __importDefault(require("http-errors"));
const Validators = new user_validation_1.default();
function loginValidation() {
    return async function (req, res, next) {
        try {
            const validated = await Validators.loginSchema.validateAsync(req.body);
            req.body = validated;
            next();
        }
        catch (err) {
            if (err.isJoi)
                return next((0, http_errors_1.default)(422, { message: err.message }));
            next((0, http_errors_1.default)(500));
        }
    };
}
exports.loginValidation = loginValidation;
async function registerValidation(req, res, next) {
    try {
        const validated = await Validators.registerSchema.validateAsync(req.body);
        req.body = validated;
        next();
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: 'Không đúng định dạng, vui lòng kiểm tra lại!'
        });
    }
}
exports.registerValidation = registerValidation;
//# sourceMappingURL=uservalidation.middleware.js.map