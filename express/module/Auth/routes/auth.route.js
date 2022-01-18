"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const authRouter = express_1.default.Router();
const authController = new auth_controller_1.default();
authRouter.post('/register', authController.hanleRegister);
authRouter.post('/login', authController.handleLogin);
exports.default = authRouter;
//# sourceMappingURL=auth.route.js.map