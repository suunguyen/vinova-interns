"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_serializer_1 = require("../serializers/auth.serializer");
const auth_service_1 = __importDefault(require("../services/auth.service"));
class AuthController {
    constructor() {
        this.AuthService = new auth_service_1.default();
        this.hanleRegister = async (req, res) => {
            const data = req.body;
            if (!data.email || !data.password) {
                return res.status(404).json({
                    success: false,
                    message: 'Missing username or password'
                });
            }
            try {
                const object = await this.AuthService.register(data.email, data.password, data.fullName);
                if (object) {
                    return res.status(200).json({
                        success: object.success,
                        message: object.message,
                        token: object.token,
                        user: (0, auth_serializer_1.serializeGetUser)(object.user)
                    });
                }
                return res.status(400).json({
                    success: false,
                    message: "Bad Request"
                });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({
                    success: false,
                    message: 'Internal Server Error'
                });
            }
        };
        this.handleLogin = async (req, res) => {
            const data = req.body;
            if (!data.email || !data.password) {
                return res.status(404).json({
                    success: false,
                    message: 'Missing username or password'
                });
            }
            try {
                const object = await this.AuthService.login(data.email, data.password);
                if (!object.success) {
                    return res.status(400).json({
                        success: object.success,
                        message: object.message
                    });
                }
                return res.status(200).json({
                    success: object.success,
                    message: object.message,
                    token: object.token,
                    user: (0, auth_serializer_1.serializeGetUser)(object.user)
                });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({
                    success: false,
                    message: 'Internal Server Error'
                });
            }
        };
    }
}
exports.default = AuthController;
//# sourceMappingURL=auth.controller.js.map