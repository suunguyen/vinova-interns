import express from 'express';
import ParentController from '../controllers/ParentController';

const parentRouter = express.Router();
const parentController = new ParentController();

parentRouter.get('/all-parent', parentController.getAllParents);
parentRouter.post('/new-parent', parentController.addParent);

export default parentRouter;