import { Router } from "express";   

import {login} from '../controllers/authController.js';

const routes = Router();

routes.post('/', login);

export default routes;