import mongoose from 'mongoose'
const Schema = mongoose.Schema;

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
})

const Auth = mongoose.model('Auth', authSchema);

export default Auth;