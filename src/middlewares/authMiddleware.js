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
            if (err) return res.status(401).send({ message: 'Token inválido!' });

            const userRequest = await userServices.showService(decoded.id);

            if (!userRequest || !userRequest._id) return res.status(401).send({ message: 'Usuário inválido!' });

            req.userId = userRequest._id;
            return next();
        });
    } catch (err) {
        console.log(err);
        res.status(400).send({ message: err.message });
    };
};

export const authMiddlewareAdm = async (req, res, next) => {
    try {
        const { userId } = req;
        const { user: { _id } } = req;
        const { typeUser } = await userServices.showService(userId);
        const administrator = typeUser.filter(el => (el.type === 'administrator'));    
        
        if (!administrator.length) return res.status(400).send({ message: 'Sem permição para realizar a operação!' });
            
        req.userUpdateId = _id;
        req.requestUserId = userId;
        return next();
    } catch (err) {
        console.log(err);
        res.status(400).send({ message: "Erro ao efetivar nível de autenticação!" });
    };
};
