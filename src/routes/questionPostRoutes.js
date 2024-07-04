import {Router} from 'express';

import questionPostController from '../controllers/questionPostController.js';

const routes = Router();

routes.post('/', questionPostController.store);
routes.get('/', questionPostController.index);

export default routes;