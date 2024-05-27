import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import userServices from '../services/userServices.js';

dotenv.config();

export const authMiddleware = (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) return res.sendStatus(401);

        const [schema, token] = authorization.split(' ');

        if (!schema || !token) return res.sendStatus(401);
        if (schema !== 'Bearer') return res.sendStatus(401);

        jwt.verify(token, process.env.SECRET_JWT, async (err, decoded) => {
            if (err) return res.status(401).send({message: 'Token inválido!'});

            const user = await userServices.showService(decoded.id);

            if(!user || !user._id) return res.status(401).send({message: 'Usuário inválido!'});
            
            req.userId = user._id;
            return next();
        });
    } catch (err) {
        console.log(err);
        res.status(400).send({ message: err.message });
    };
};