import { Router } from "express";

import userController from '../controllers/userController.js';
import { authMiddleware, authMiddlewareAdm } from "../middlewares/authMiddleware.js";
import { isValid } from '../middlewares/globalMiddleware.js';

const routes = Router();

routes.post('/', authMiddleware, userController.store);
routes.get('/', authMiddleware, userController.index);
routes.get('/:id', authMiddleware, isValid, userController.show);
routes.patch('/:id', authMiddleware, isValid, userController.update);
routes.delete('/:id', authMiddleware, isValid, userController.erase);

routes.patch('/promotion/:id', authMiddleware, isValid, authMiddlewareAdm, userController.promotion);

export default routes;
