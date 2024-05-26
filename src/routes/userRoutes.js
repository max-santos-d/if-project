import express from 'express';

import userController from '../controllers/userController.js';
import isValid from '../middlewares/globalMiddleware.js'

const routes = express.Router();

routes.post('/', userController.store);
routes.get('/', userController.index);
routes.get('/:id', isValid, userController.show);
routes.patch('/:id', isValid, userController.update);

export default routes;