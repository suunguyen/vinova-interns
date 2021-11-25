import { Router } from 'express';
import studentRouter from './student';
import authRouter from './auth';
import parentRouter from './parent';
import classRouter from './class';

const route = (app: Router) => {
    app.use('/api/auth', authRouter);
    app.use('/api/student', studentRouter);
    app.use('/api/parent', parentRouter);
    app.use('/api/class', classRouter);
}

export default route;