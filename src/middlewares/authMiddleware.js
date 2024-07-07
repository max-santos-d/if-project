import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import mongoose from "mongoose";

import userServices from '../services/userServices.js';

dotenv.config();

export const authCheckerMiddleware = (req, res, next) => {
    try {
        const authorization = req.headers.authorization;

        if (!authorization) return res.status(401).send({ message: 'Token de autorização não informado!' });

        const [schema, token] = authorization.split(' ');

        if (!schema || !token) return res.status(401).send({ message: 'Erro na leitura do Token!' });
        if (schema !== 'Bearer') return res.status(401).send({ message: 'Erro na leitura do Token!' });

        jwt.verify(token, process.env.SECRET_JWT, async (err, decoded) => {
            err && console.log(err);
            if (err) return res.status(401).send({ message: 'Erro na decodificação do Token!' });

            const tokenId = decoded.id;

            if (!mongoose.Types.ObjectId.isValid(tokenId)) return res.status(400).send({ message: 'ID de Token inválido' });

            const requestUserToken = await userServices.showService(tokenId);

            if (!requestUserToken) return res.status(401).send({ message: 'Usuário do Token não encontrado!' });

            req.requestUserTokenId = requestUserToken._id;
            return next();
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Erro inesperado ao realizar requisição!" });
    };
};

export const adminAuthCheckerMiddleware = async (req, res, next) => {
    try {
        const { requestUserTokenId } = req;
        const { userType } = await userServices.showService(requestUserTokenId);
        const adminField = userType.filter(el => (el.type === 'administrator'));

        if (!adminField.length) return res.status(400).send({ message: 'Sem permição para realizar a operação!' });

        return next();
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Erro ao efetivar nível de autenticação!" });
    };
};

export const organizerAuthCheckerMiddleware = async (req, res, next) => {
    try{
        const { requestUserTokenId } = req; 
        const { userType } = await userServices.showService(requestUserTokenId);
        const organizerField = userType.filter(el => (el.type === 'organization'));

        if (!organizerField.length) return res.status(400).send({ message: 'Sem permição para realizar a operação!' });

        return next();
    }catch (err) {
        console.log(err);
        res.status(400).send({message: 'Erro ao efetivar nível de autenticação!'});
    }
}
