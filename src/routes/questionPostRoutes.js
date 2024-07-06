import {Router} from 'express';

import questionPostController from '../controllers/questionPostController.js';
import {postIdValidation} from '../middlewares/globalMiddleware.js'
import {authCheckerMiddleware} from '../middlewares/authMiddleware.js'

const routes = Router();

routes.post('/', authCheckerMiddleware, questionPostController.store);
routes.get('/', questionPostController.index);
routes.get('/:id', postIdValidation, questionPostController.show);
routes.patch('/:id', authCheckerMiddleware, postIdValidation, questionPostController.update);
routes.delete('/:id', authCheckerMiddleware, postIdValidation, questionPostController.erase);

export default routes;