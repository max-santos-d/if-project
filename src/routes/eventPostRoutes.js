import { Router } from 'express';

import eventPostController from '../controllers/eventPostController.js';
import { authCheckerMiddleware, organizerAuthCheckerMiddleware } from '../middlewares/authMiddleware.js';
import { idValidation ,postIdValidation } from '../middlewares/globalMiddleware.js';

const routes = Router();

routes.post('/', authCheckerMiddleware, organizerAuthCheckerMiddleware, eventPostController.store);
routes.get('/', eventPostController.index);
routes.get('/search', eventPostController.show);
routes.patch('/:id', authCheckerMiddleware, organizerAuthCheckerMiddleware, idValidation, postIdValidation, eventPostController.update);
routes.delete('/:id', authCheckerMiddleware, organizerAuthCheckerMiddleware, idValidation, postIdValidation, eventPostController.erase);

routes.patch('/like/:id', authCheckerMiddleware, eventPostController.like);

export default routes;