import {Router} from 'express';

import postEventController from '../controllers/eventPostController.js';
import {authMiddleware} from '../middlewares/authMiddleware.js'

const routes = Router();

routes.post('/', authMiddleware, postEventController.store);
routes.get('/', postEventController.index);
routes.get('/search', postEventController.show);
routes.patch('/:id', authMiddleware, postEventController.update);
routes.delete('/:id', authMiddleware, postEventController.erase);

routes.patch('/like/:id', authMiddleware, postEventController.like);

export default routes;