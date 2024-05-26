import express from 'express';

import userController from '../controllers/userController.js';

const routes = express.Router();

routes.post('/', userController.store);
routes.get('/', userController.index);
routes.get('/:id', userController.show);
routes.patch('/:id', userController.update);

export default routes;