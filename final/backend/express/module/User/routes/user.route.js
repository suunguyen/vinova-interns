"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const uservalidation_middleware_1 = require("../../../middlewares/uservalidation.middleware");
const authRouter = express_1.default.Router();
const authController = new user_controller_1.default();
authRouter.post('/register', uservalidation_middleware_1.registerValidation, authController.hanleRegister);
authRouter.post('/login', authController.handleLogin);
authRouter.post('/updateUserInfo', authController.handleUpdateUserInfo);
authRouter.post('/updateDeliveryAddress', authController.handleUpdateDeliveryAddress);
authRouter.get('/getUserInfo', authController.handleGetUserInfo);
authRouter.get('/getDeliveryAddress', authController.handleGetDeliveryAddress);
exports.default = authRouter;
//# sourceMappingURL=user.route.js.map