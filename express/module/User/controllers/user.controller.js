"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_serializer_1 = require("../serializers/user.serializer");
const user_service_1 = __importDefault(require("../services/user.service"));
class AuthController {
    constructor() {
        this.AuthService = new user_service_1.default();
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
                if (object.success) {
                    return res.status(200).json({
                        success: object.success,
                        message: object.message,
                        token: object.token,
                        user: (0, user_serializer_1.serializeGetUser)(object.user)
                    });
                }
                return res.status(400).json({
                    success: object.success,
                    message: object.message
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
                    user: (0, user_serializer_1.serializeGetUser)(object.user)
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
        this.handleUpdateUserInfo = async (req, res) => {
            try {
                const userId = req.query.userId;
                const data = req.body;
                const object = await this.AuthService.updateUserInfoById(userId, data.fullName, data.displayName, data.oldPassword, data.password);
                if (object.success) {
                    if (data.password !== '' && data.password !== null && data.password !== undefined) {
                        return res.status(200).json({
                            success: object.success,
                            message: object.message,
                            update: object.obj,
                            token: object.token
                        });
                    }
                    return res.status(200).json({
                        success: object.success,
                        message: object.message,
                        update: object.obj
                    });
                }
                return res.status(400).json({
                    success: object.success,
                    message: object.message,
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
        this.handleUpdateDeliveryAddress = async (req, res) => {
            try {
                const userId = req.query.userId;
                const data = req.body;
                const object = await this.AuthService.updateDeliveryAddressById(userId, data.fullName, data.phone, data.city, data.district, data.ward, data.apartmentNumber);
                if (object.success) {
                    return res.status(200).json({
                        success: object.success,
                        message: object.message,
                        address: object.address
                    });
                }
                return res.status(400).json({
                    success: object.success,
                    message: object.message,
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
        this.handleGetUserInfo = async (req, res) => {
            try {
                const id = req.query.userId;
                const object = await this.AuthService.getUserInfo(id);
                if (object.success) {
                    return res.status(200).json({
                        success: object.success,
                        message: object.message,
                        user: (0, user_serializer_1.serializeGetUser)(object.user)
                    });
                }
                return res.status(400).json({
                    success: object.success,
                    message: object.message,
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
        this.handleGetDeliveryAddress = async (req, res) => {
            try {
                const id = req.query.userId;
                const object = await this.AuthService.getDeliveryAddress(id);
                if (object.success) {
                    return res.status(200).json({
                        success: object.success,
                        message: object.message,
                        data: object.obj
                    });
                }
                return res.status(400).json({
                    success: object.success,
                    message: object.message,
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
//# sourceMappingURL=user.controller.js.map