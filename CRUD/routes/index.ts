import { Router } from 'express';
import authRouter from './auth';

const route = (app: Router) => {
    app.use("/api/auth", authRouter);
}

export default route;