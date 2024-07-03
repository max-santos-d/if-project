import {Router} from 'express';

import postEventController from '../controllers/eventPostController.js';

const routes = Router();

routes.post('/', postEventController.store);
routes.get('/', postEventController.index);
routes.get('/search', postEventController.show);
routes.patch('/:id', postEventController.update);
routes.delete('/:id', postEventController.erase);

export default routes;