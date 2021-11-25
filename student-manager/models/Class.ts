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

const Class = mongoose.model('Class', classSchema);

export default Class;