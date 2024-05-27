import { Router } from "express";

import userController from '../controllers/userController.js';
import isValid from '../middlewares/globalMiddleware.js'

const routes = Router();

routes.post('/', userController.store);
routes.get('/', userController.index);
routes.get('/:id', isValid, userController.show);
routes.patch('/:id', isValid, userController.update);
routes.delete('/:id', isValid, userController.del);

export default routes;