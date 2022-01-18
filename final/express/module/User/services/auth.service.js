"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_model_1 = __importDefault(require("../models/auth.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const saltRounds = 10;
const salt = bcrypt_1.default.genSaltSync(saltRounds);
class AuthService {
    constructor() {
        this.register = (email, password, fullName) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const hashedPassword = bcrypt_1.default.hashSync(password, salt);
                    const existingEmail = await auth_model_1.default.findOne({ email });
                    if (existingEmail) {
                        let error = {
                            message: 'Email has already existed',
                            success: false
                        };
                        resolve(error);
                    }
                    const newUser = new auth_model_1.default({
                        fullName,
                        email,
                        password: hashedPassword
                    });
                    await newUser.save();
                    const token = jsonwebtoken_1.default.sign({
                        userId: newUser._id,
                    }, process.env.ACCESS_TOKEN_SECRET || '');
                    const response = {
                        success: true,
                        message: 'User has been created successfully',
                        token,
                        user: newUser
                    };
                    resolve(response);
                }
                catch (error) {
                    reject(error);
                }
            });
        };
        this.login = (email, password) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const user = await auth_model_1.default.findOne({ email });
                    if (!user) {
                        let error = {
                            message: 'Incorrect email or password',
                            success: false
                        };
                        resolve(error);
                    }
                    const isValidPassword = bcrypt_1.default.compareSync(password, user.password);
                    if (!isValidPassword) {
                        let error = {
                            message: 'Incorrect email or password',
                            success: false
                        };
                        resolve(error);
                    }
                    const token = jsonwebtoken_1.default.sign({
                        userId: user._id,
                    }, process.env.ACCESS_TOKEN_SECRET || '');
                    const response = {
                        success: true,
                        message: 'User has been logged in successfully',
                        token,
                        user
                    };
                    resolve(response);
                }
                catch (error) {
                    reject(error);
                }
            });
        };
    }
}
exports.default = AuthService;
//# sourceMappingURL=auth.service.js.map