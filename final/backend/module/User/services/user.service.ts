import { Document } from 'mongoose';
import Auth from '../models/user.model'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { serializeGetUserInfo } from '../serializers/user.serializer';
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

interface ISuccessResponse<T extends Document> {
    message: string,
    success: boolean,
    token?: string,
    user?: T,
    address?: string,
    obj?: object
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
    updateUserInfoById = (id: string, fullName: string, displayName: string, oldPassword: string, password: string) => {
        return new Promise<any>(async (resolve, reject) => {
            try {
                if ((oldPassword === '' || oldPassword === undefined || oldPassword.length === 0 || oldPassword === null) && (password === '' || password === undefined || password.length === 0 || password === null)) {
                    const update = {
                        fullName,
                        displayName,
                    }
                    const data = await Auth.findOneAndUpdate({ _id: id }, update, { new: true });
                    if (data) {
                        const response: ISuccessResponse<Document> = {
                            message: 'Cập nhật thông tin người dùng thành công!',
                            success: true,
                            obj: serializeGetUserInfo(data)
                        }
                        resolve(response);
                    }
                } else {
                    const hashedPassword = bcrypt.hashSync(password, salt);
                    const update = {
                        fullName,
                        displayName,
                        password: hashedPassword
                    }
                    const object = await Auth.findOne({ _id: id });
                    const isValidPassword = bcrypt.compareSync(oldPassword, object.password);
                    if (isValidPassword) {
                        const data = await Auth.findOneAndUpdate({ _id: id }, update, { new: true });
                        if (data) {
                            // All good
                            const token = jwt.sign({
                                userId: data._id,
                            }, process.env.ACCESS_TOKEN_SECRET || '');
                            const response: ISuccessResponse<Document> = {
                                message: 'Cập nhật thông tin người dùng thành công!',
                                success: true,
                                obj: serializeGetUserInfo(data),
                                token: token
                            }
                            resolve(response);
                        }
                    } else {
                        const error: IErrorResponse = {
                            message: 'Mật khẩu cũ không khớp, vui lòng kiểm tra lại.',
                            success: false
                        }
                        resolve(error);
                    }
                }
                const error: IErrorResponse = {
                    message: 'Failed to update user information',
                    success: false
                }
                resolve(error);
            } catch (error) {
                reject(error);
            }
        })
    }
    updateDeliveryAddressById = (id: string, fullName: string, phone: string, city: string, district: string, ward: string, apartmentNumber: string) => {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const address = fullName + " - " + phone + ", " + apartmentNumber + ", " + ward + ", " + district + ", " + city;
                const update = {
                    address
                }
                const data = await Auth.findOneAndUpdate({ _id: id }, update);
                if (data) {
                    const response: ISuccessResponse<Document> = {
                        message: 'Delivery address was updated successfully',
                        success: true,
                        address
                    }
                    resolve(response);
                }
                const error: IErrorResponse = {
                    message: 'Failed to update delivery address',
                    success: false
                }
                resolve(error);
            } catch (error) {
                reject(error);
            }
        })
    }
    getUserInfo = (id: string) => {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const data = await Auth.findOne({ _id: id });
                if (data) {
                    const response: ISuccessResponse<Document> = {
                        success: true,
                        message: 'Lấy thông tin người dùng thành công!',
                        user: data
                    }
                    resolve(response);
                }
                const error: IErrorResponse = {
                    message: 'Lấy thông tin người dùng thất bại!',
                    success: false
                }
                resolve(error);
            } catch (error) {
                reject(error);
            }
        })
    }

    getDeliveryAddress = (id: string) => {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const object = await Auth.findOne({ _id: id });
                const data = object.address;
                const array_one = data.split(",");
                const name_phone = array_one[0].trim();
                const apartmentNumber = array_one[1].trim();
                const ward = array_one[2].trim();
                const district = array_one[3].trim();
                const city = array_one[4].trim();
                const name_phone_array = name_phone.split("-");
                const fullName = name_phone_array[0].trim();
                const phone = name_phone_array[1].trim();
                let adr_detail = {
                    address: data,
                    fullName,
                    phone,
                    city,
                    district,
                    ward,
                    apartmentNumber
                }
                console.log(adr_detail);
                if (data) {
                    const response: ISuccessResponse<Document> = {
                        success: true,
                        message: 'Lấy địa chỉ giao hàng thành công!',
                        obj: adr_detail
                    }
                    resolve(response);
                }
                const error: IErrorResponse = {
                    message: 'Lấy địa chỉ giao hàng thất bại!',
                    success: false
                }
                resolve(error);
            } catch (error) {
                reject(error);
            }
        })
    }
}