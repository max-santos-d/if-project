import express from 'express';

import userController from '../controllers/userController.js';

const routes = express.Router();

routes.post('/', userController.store);

export default routes;