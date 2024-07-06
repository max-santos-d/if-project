import {Router} from 'express';

import eventPostController from '../controllers/eventPostController.js';
import {authCheckerMiddleware} from '../middlewares/authMiddleware.js';
import { userIdValidation } from '../middlewares/globalMiddleware.js';

const routes = Router();

routes.post('/', authCheckerMiddleware, eventPostController.store);
routes.get('/', eventPostController.index);
routes.get('/search', eventPostController.show);
routes.patch('/:id', authCheckerMiddleware, userIdValidation, eventPostController.update);
routes.delete('/:id', authCheckerMiddleware, userIdValidation, eventPostController.erase);

routes.patch('/like/:id', authCheckerMiddleware, eventPostController.like);

export default routes;