import 'dotenv/config'
import express, { Router } from 'express'
import Connect from './config/connect.config';
import studentRouter from './module/Student/routes/student.route';

// Connect to MongoDB
Connect();

const app = express();
app.use(express.json());

// Config route
const route = (app: Router) => {
    app.use('/api/student', studentRouter);
}

route(app);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));