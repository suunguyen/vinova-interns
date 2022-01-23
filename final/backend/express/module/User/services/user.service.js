"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_serializer_1 = require("../serializers/user.serializer");
const saltRounds = 10;
const salt = bcrypt_1.default.genSaltSync(saltRounds);
class AuthService {
    constructor() {
        this.register = (email, password, fullName) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const hashedPassword = bcrypt_1.default.hashSync(password, salt);
                    const existingEmail = await user_model_1.default.findOne({ email });
                    if (existingEmail) {
                        let error = {
                            message: 'Email has already existed',
                            success: false
                        };
                        resolve(error);
                    }
                    const newUser = new user_model_1.default({
                        fullName,
                        email,
                        password: hashedPassword
                    });
                    await newUser.save();
                    const token = jsonwebtoken_1.default.sign({
                        userId: newUser._id,
                    }, process.env.ACCESS_TOKEN_SECRET || '');
                    const response = {
                        success: true,
                        message: 'User has been created successfully',
                        token,
                        user: newUser
                    };
                    resolve(response);
                }
                catch (error) {
                    reject(error);
                }
            });
        };
        this.login = (email, password) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const user = await user_model_1.default.findOne({ email });
                    if (!user) {
                        let error = {
                            message: 'Incorrect email or password',
                            success: false
                        };
                        resolve(error);
                    }
                    const isValidPassword = bcrypt_1.default.compareSync(password, user.password);
                    if (!isValidPassword) {
                        let error = {
                            message: 'Incorrect email or password',
                            success: false
                        };
                        resolve(error);
                    }
                    const token = jsonwebtoken_1.default.sign({
                        userId: user._id,
                    }, process.env.ACCESS_TOKEN_SECRET || '');
                    const response = {
                        success: true,
                        message: 'User has been logged in successfully',
                        token,
                        user
                    };
                    resolve(response);
                }
                catch (error) {
                    reject(error);
                }
            });
        };
        this.updateUserInfoById = (id, fullName, displayName, oldPassword, password) => {
            return new Promise(async (resolve, reject) => {
                try {
                    if ((oldPassword === '' || oldPassword === undefined || oldPassword.length === 0 || oldPassword === null) && (password === '' || password === undefined || password.length === 0 || password === null)) {
                        const update = {
                            fullName,
                            displayName,
                        };
                        const data = await user_model_1.default.findOneAndUpdate({ _id: id }, update, { new: true });
                        if (data) {
                            const response = {
                                message: 'Cập nhật thông tin người dùng thành công!',
                                success: true,
                                obj: (0, user_serializer_1.serializeGetUserInfo)(data)
                            };
                            resolve(response);
                        }
                    }
                    else {
                        const hashedPassword = bcrypt_1.default.hashSync(password, salt);
                        const update = {
                            fullName,
                            displayName,
                            password: hashedPassword
                        };
                        const object = await user_model_1.default.findOne({ _id: id });
                        const isValidPassword = bcrypt_1.default.compareSync(oldPassword, object.password);
                        if (isValidPassword) {
                            const data = await user_model_1.default.findOneAndUpdate({ _id: id }, update, { new: true });
                            if (data) {
                                const token = jsonwebtoken_1.default.sign({
                                    userId: data._id,
                                }, process.env.ACCESS_TOKEN_SECRET || '');
                                const response = {
                                    message: 'Cập nhật thông tin người dùng thành công!',
                                    success: true,
                                    obj: (0, user_serializer_1.serializeGetUserInfo)(data),
                                    token: token
                                };
                                resolve(response);
                            }
                        }
                        else {
                            const error = {
                                message: 'Mật khẩu cũ không khớp, vui lòng kiểm tra lại.',
                                success: false
                            };
                            resolve(error);
                        }
                    }
                    const error = {
                        message: 'Failed to update user information',
                        success: false
                    };
                    resolve(error);
                }
                catch (error) {
                    reject(error);
                }
            });
        };
        this.updateDeliveryAddressById = (id, fullName, phone, city, district, ward, apartmentNumber) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const address = fullName + " - " + phone + ", " + apartmentNumber + ", " + ward + ", " + district + ", " + city;
                    const update = {
                        address
                    };
                    const data = await user_model_1.default.findOneAndUpdate({ _id: id }, update);
                    if (data) {
                        const response = {
                            message: 'Delivery address was updated successfully',
                            success: true,
                            address
                        };
                        resolve(response);
                    }
                    const error = {
                        message: 'Failed to update delivery address',
                        success: false
                    };
                    resolve(error);
                }
                catch (error) {
                    reject(error);
                }
            });
        };
        this.getUserInfo = (id) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const data = await user_model_1.default.findOne({ _id: id });
                    if (data) {
                        const response = {
                            success: true,
                            message: 'Lấy thông tin người dùng thành công!',
                            user: data
                        };
                        resolve(response);
                    }
                    const error = {
                        message: 'Lấy thông tin người dùng thất bại!',
                        success: false
                    };
                    resolve(error);
                }
                catch (error) {
                    reject(error);
                }
            });
        };
        this.getDeliveryAddress = (id) => {
            return new Promise(async (resolve, reject) => {
                try {
                    const object = await user_model_1.default.findOne({ _id: id });
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
                    };
                    console.log(adr_detail);
                    if (data) {
                        const response = {
                            success: true,
                            message: 'Lấy địa chỉ giao hàng thành công!',
                            obj: adr_detail
                        };
                        resolve(response);
                    }
                    const error = {
                        message: 'Lấy địa chỉ giao hàng thất bại!',
                        success: false
                    };
                    resolve(error);
                }
                catch (error) {
                    reject(error);
                }
            });
        };
    }
}
exports.default = AuthService;
//# sourceMappingURL=user.service.js.map