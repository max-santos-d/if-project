import { Router } from 'express';

import questionPostController from '../controllers/questionPostController.js';
import { idValidation } from '../middlewares/globalMiddleware.js'
import { authCheckerMiddleware } from '../middlewares/authMiddleware.js'

const routes = Router();

routes.post('/', authCheckerMiddleware, questionPostController.store);
routes.get('/', questionPostController.index);
routes.get('/:id', idValidation, questionPostController.show);
routes.patch('/:id', authCheckerMiddleware, idValidation, questionPostController.update);
routes.delete('/:id', authCheckerMiddleware, idValidation, questionPostController.erase);

export default routes;