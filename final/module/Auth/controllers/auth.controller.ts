import { Request, Response } from 'express'
import { LoginDTO, RegisterDTO } from '../DTO/auth.dto';
import { serializeGetUser } from '../serializers/auth.serializer';
import AuthService from '../services/auth.service';

export default class AuthController {
    public AuthService: AuthService = new AuthService();
    hanleRegister = async (req: Request, res: Response): Promise<Response> => {
        const data: RegisterDTO = req.body;

        // Simple validation
        if (!data.email || !data.password) {
            return res.status(404).json({
                success: false,
                message: 'Missing username or password'
            })
        }
        try {
            const object = await this.AuthService.register(data.email, data.password, data.fullName);
            if (object) {
                return res.status(200).json({
                    success: object.success,
                    message: object.message,
                    token: object.token,
                    user: serializeGetUser(object.user)
                })
            }
            return res.status(400).json({
                success: false,
                message: "Bad Request"
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error'
            })
        }
    }

    handleLogin = async (req: Request, res: Response): Promise<Response> => {
        const data: LoginDTO = req.body;

        // Simple validation
        if (!data.email || !data.password) {
            return res.status(404).json({
                success: false,
                message: 'Missing username or password'
            })
        }
        try {
            // All good
            const object = await this.AuthService.login(data.email, data.password);

            if (!object.success) {
                return res.status(400).json({
                    success: object.success,
                    message: object.message
                })
            }

            return res.status(200).json({
                success: object.success,
                message: object.message,
                token: object.token,
                user: serializeGetUser(object.user)
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error'
            })
        }
    }
}
