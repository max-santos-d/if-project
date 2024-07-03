import {Router} from 'express';

import postEventController from '../controllers/eventPostController.js';

const routes = Router();

routes.post('/', postEventController.store);

export default routes;