import { Router } from "express";

import userController from '../controllers/userController.js';
import { authCheckerMiddleware, adminAuthCheckerMiddleware } from "../middlewares/authMiddleware.js";
import { idValidation, userIdValidation } from '../middlewares/globalMiddleware.js';

const routes = Router();

// CRUD
// Create
routes.post('/', userController.store);
// Update                  
routes.patch('/', authCheckerMiddleware, userController.update);
// Read All
routes.get('/', userController.index);
// Read One        
routes.get('/:id', idValidation, userIdValidation, userController.show);
// Delete
routes.delete('/', authCheckerMiddleware, userController.erase);

routes.patch('/userTypeUpdate/:id', authCheckerMiddleware, adminAuthCheckerMiddleware, idValidation, userController.userTypeUpdate);

export default routes;
