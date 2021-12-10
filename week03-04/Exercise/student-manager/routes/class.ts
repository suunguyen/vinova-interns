import express from 'express';
import ClassController from '../controllers/ClassController';

const classRouter = express.Router();
const classController = new ClassController();

classRouter.get('/all-class', classController.getAllClasses);
classRouter.post('/add-class', classController.addClass);

export default classRouter;