import mongoose from "mongoose";

const DB_URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@weekly-project.3oqc3.mongodb.net/weekly-project?retryWrites=true&w=majority`

const Connect = async () => {
    try {
        await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Database connected');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default Connect;