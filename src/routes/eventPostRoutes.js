import {Router} from 'express';

import postEventController from '../controllers/eventPostController.js';
import {authMiddleware} from '../middlewares/authMiddleware.js';
import { isValid } from '../middlewares/globalMiddleware.js';

const routes = Router();

routes.post('/', authMiddleware, postEventController.store);
routes.get('/', postEventController.index);
routes.get('/search', postEventController.show);
routes.patch('/:id', authMiddleware, isValid, postEventController.update);
routes.delete('/:id', authMiddleware, isValid, postEventController.erase);

routes.patch('/like/:id', authMiddleware, postEventController.like);

export default routes;