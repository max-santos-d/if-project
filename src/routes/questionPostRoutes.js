import {Router} from 'express';

import questionPostController from '../controllers/questionPostController.js';
import {postIdValidation} from '../middlewares/globalMiddleware.js'

const routes = Router();

routes.post('/', questionPostController.store);
routes.get('/', questionPostController.index);
routes.get('/:id', postIdValidation, questionPostController.show);
routes.patch('/:id', postIdValidation, questionPostController.update);

export default routes;