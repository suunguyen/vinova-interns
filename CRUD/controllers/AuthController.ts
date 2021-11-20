require('dotenv').config();
import { Request, Response } from 'express';
import Auth from '../models/Auth';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const saltRounds: number = 10;
const salt: any = bcrypt.genSaltSync(saltRounds);

export default class AuthController {
    async register(req: Request, res: Response) {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: "Missing username or password",
            });
        }

        if (!username) {
            return res.status(400).json({
                success: false,
                message: "Username is required"
            })
        }

        if (!password) {
            return res.status(400).json({
                success: false,
                message: "Password is required"
            })
        }

        try {
            // Check for existing user
            const user = await Auth.findOne({ username });
            if (user)
                return res
                    .status(400)
                    .json({ success: false, message: "Duplicated username or email" });

            const hashedPassword: string = bcrypt.hashSync(password, salt);
            const newUser = new Auth({
                username,
                password: hashedPassword
            });
            await newUser.save();

            // Return token
            const accessToken = jwt.sign(
                { userId: newUser._id },
                process.env.ACCESS_TOKEN_SECRET || "hacked"
            );
            return res.status(200).json({
                success: true,
                accessToken,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: "false",
                message: "Internal Server Error",
            });
        }
    }

    async login(req: Request, res: Response) {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: "Missing username or password",
            });
        }

        try {
            const auth = await Auth.findOne({ username });
            if (!auth)
                return res.status(400).json({
                    success: false,
                    message: "Invalid username or password",
                });

            const validPassword = bcrypt.compareSync(password, auth.password);

            if (!validPassword)
                return res.status(400).json({
                    success: false,
                    message: "Invalid username or password",
                });

            // All good
            const accessToken = jwt.sign(
                { userId: auth._id },
                process.env.ACCESS_TOKEN_SECRET || "hacked"
            );
            return res.status(200).json({
                success: true,
                accessToken,
                auth
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: "false",
                message: "Internal Server Error",
            });
        }
    }
}