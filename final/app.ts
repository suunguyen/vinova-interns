import 'dotenv/config'
import express, { Router } from 'express'
import Connect from './config/connect.config';
import authRouter from './module/Auth/routes/auth.route';
import cors from 'cors';

// Connect to MongoDB
Connect();

const app = express();
app.use(express.json());
app.use(cors());

// Config route
const route = (app: Router) => {
    app.use('/api/auth', authRouter);
}

route(app);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));