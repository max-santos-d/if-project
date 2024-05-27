import { Router } from "express";

import userController from '../controllers/userController.js';
import isValid from '../middlewares/globalMiddleware.js';
import { authMiddleware } from "../middlewares/authMiddleware.js";

const routes = Router();

routes.post('/', authMiddleware, userController.store);
routes.get('/', authMiddleware, userController.index);
routes.get('/:id', authMiddleware, isValid, userController.show);
routes.patch('/:id', authMiddleware, isValid, userController.update);
routes.delete('/:id', authMiddleware, isValid, userController.del);

export default routes;
