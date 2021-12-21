import { Document } from 'mongoose';
import Auth from '../models/auth.model'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

interface ISuccessResponse<T extends Document> {
    message: string,
    success: boolean,
    token: string,
    user: T
}

interface IErrorResponse {
    message: string,
    success: boolean,
}

export default class AuthService {
    register = (email: string, password: string, fullName: string) => {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const hashedPassword = bcrypt.hashSync(password, salt);

                // Check whether email is exist or not?
                const existingEmail = await Auth.findOne({ email });
                if (existingEmail) {
                    let error: IErrorResponse = {
                        message: 'Email has already existed',
                        success: false
                    }
                    resolve(error);
                }

                // All good 
                const newUser = new Auth({
                    fullName,
                    email,
                    password: hashedPassword
                })

                await newUser.save();

                const token = jwt.sign({
                    userId: newUser._id,
                }, process.env.ACCESS_TOKEN_SECRET || '');

                const response: ISuccessResponse<Document> = {
                    success: true,
                    message: 'User has been created successfully',
                    token,
                    user: newUser
                }
                resolve(response);
            } catch (error) {
                reject(error);
            }
        })
    }

    login = (email: string, password: string) => {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const user = await Auth.findOne({ email });

                // Check whether email is exist or not?
                if (!user) {
                    let error: IErrorResponse = {
                        message: 'Incorrect email or password',
                        success: false
                    }
                    resolve(error);
                }

                const isValidPassword = bcrypt.compareSync(password, user.password);

                // Check whether password is correct or not?
                if (!isValidPassword) {
                    let error: IErrorResponse = {
                        message: 'Incorrect email or password',
                        success: false
                    }
                    resolve(error);
                }

                // All good
                const token = jwt.sign({
                    userId: user._id,
                }, process.env.ACCESS_TOKEN_SECRET || '');

                const response: ISuccessResponse<Document> = {
                    success: true,
                    message: 'User has been logged in successfully',
                    token,
                    user
                }
                resolve(response);
            } catch (error) {
                reject(error);
            }
        })
    }
}