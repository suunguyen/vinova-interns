import express from 'express';
import AuthController from '../controllers/auth.controller';

const authRouter = express.Router();
const authController = new AuthController();

authRouter.post('/register', authController.hanleRegister);
authRouter.post('/login', authController.handleLogin);

export default authRouter;