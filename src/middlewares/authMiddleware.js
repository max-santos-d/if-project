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
        const requestUser = await userServices.showService(userId);
        const userUpdate = await userServices.showService(_id);

        //if (requestUser.typeUser[0] !== 'administrator' && requestUser.typeUser[0] !== 'organization') return res.status(400).send({ message: 'Sem permição para realizar a operação!' });
        
        req.userUpdate = userUpdate;
        return next();
    } catch (err) {
        console.log(err);
        res.status(400).send({ message: "Erro ao efetivar nível de autenticação!" });
    };
};
