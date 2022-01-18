"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const authSchema = new Schema({
    fullName: {
        type: String,
    },
    displayName: {
        type: String,
        default: "itdev126_"
    },
    phone: {
        type: String
    },
    address: {
        type: String
    },
    avatar: {
        type: String,
        default: "https://cf.shopee.vn/file/4c33a4d90c9c07b95522a515aa790916"
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});
const Auth = mongoose_1.default.model('Auth', authSchema);
exports.default = Auth;
//# sourceMappingURL=auth.model.js.map