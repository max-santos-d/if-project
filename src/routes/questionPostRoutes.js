import {Router} from 'express';

import questionPostController from '../controllers/questionPostController.js';
import {postIdValidation} from '../middlewares/globalMiddleware.js'
import {authMiddleware} from '../middlewares/authMiddleware.js'

const routes = Router();

routes.post('/', authMiddleware, questionPostController.store);
routes.get('/', questionPostController.index);
routes.get('/:id', postIdValidation, questionPostController.show);
routes.patch('/:id', authMiddleware, postIdValidation, questionPostController.update);
routes.delete('/:id', authMiddleware, postIdValidation, questionPostController.erase);

export default routes;