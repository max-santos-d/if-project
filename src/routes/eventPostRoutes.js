import {Router} from 'express';

import eventPostController from '../controllers/eventPostController.js';
import {authMiddleware} from '../middlewares/authMiddleware.js';
import { isValid } from '../middlewares/globalMiddleware.js';

const routes = Router();

routes.post('/', authMiddleware, eventPostController.store);
routes.get('/', eventPostController.index);
routes.get('/search', eventPostController.show);
routes.patch('/:id', authMiddleware, isValid, eventPostController.update);
routes.delete('/:id', authMiddleware, isValid, eventPostController.erase);

routes.patch('/like/:id', authMiddleware, eventPostController.like);

export default routes;