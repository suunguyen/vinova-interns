import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const parentSchema = new Schema({
    name: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date
    }
})

const Parent = mongoose.model('Parent', parentSchema);
export default Parent;