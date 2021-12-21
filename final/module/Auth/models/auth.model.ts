import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const authSchema = new Schema({
    fullName: {
        type: String,
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