import mongoose from "mongoose";

import userServices from "../services/userServices.js";
import questionPostServices from "../services/questionPostServices.js";

export const idValidation = (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).send({ message: 'ID inválido' });
    next();
};

export const userIdValidation = async (req, res, next) => {
    try{
        const { id: idParams } = req.params;

        if(!idParams) return res.status(400).send({message: 'ID não informado!'});

        const userParams = await userServices.showService(idParams);

        if(!userParams) return res.status(400).send({message: 'ID não encontrado!'});

        req.userParams = userParams;
        next();
    }catch (err) {
        console.log(err);
        res.status(500).send({message: "Erro inesperado ao realizar requisição!"});
    };
};

export const postIdValidation = async (req, res, next) => {
    try{
        const {id: postId} = req.params;

        const post = await questionPostServices.showService(postId);

        if(!post) return res.status(400).send({message: 'Post não encontrado!'});

        req.post = post;
        next();
    }catch (err) {
        console.log(err);
        res.status(500).send({message: 'Erro inesperado na requisição!'});
    };
};
