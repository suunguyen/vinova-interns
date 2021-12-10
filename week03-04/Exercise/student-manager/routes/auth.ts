import express from 'express';
import AuthController from '../controllers/AuthController';

const authRouter = express.Router();
const authController = new AuthController();

authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);

export default authRouter;