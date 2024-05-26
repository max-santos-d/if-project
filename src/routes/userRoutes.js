import express from 'express';

import userController from '../controllers/userController.js';

const routes = express.Router();

routes.post('/', userController.store);
routes.get('/', userController.index);

export default routes;