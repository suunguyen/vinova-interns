import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name: {
        type: String
    },
    dateOfBirth: {
        type: Date
    },
    gender: {
        type: Boolean,
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date
    }
})

const Student = mongoose.model('Student', studentSchema);

export default Student;