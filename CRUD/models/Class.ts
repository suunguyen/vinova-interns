import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const classSchema = new Schema({
    name: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date
    },
    students: [{
        type: Schema.Types.ObjectId,
        ref: 'Student'
    }]
})

module.exports = mongoose.model('Class', classSchema);