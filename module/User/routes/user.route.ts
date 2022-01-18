import express from 'express';
import AuthController from '../controllers/user.controller';

const authRouter = express.Router();
const authController = new AuthController();

authRouter.post('/register', authController.hanleRegister);
authRouter.post('/login', authController.handleLogin);
authRouter.post('/updateUserInfo', authController.handleUpdateUserInfo);
authRouter.post('/updateDeliveryAddress', authController.handleUpdateDeliveryAddress);
authRouter.get('/getUserInfo', authController.handleGetUserInfo);
authRouter.get('/getDeliveryAddress', authController.handleGetDeliveryAddress);

export default authRouter;