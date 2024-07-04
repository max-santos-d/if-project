import mongoose from "mongoose";

import userServices from "../services/userServices.js";
import questionPostServices from "../services/questionPostServices.js";

export const isValid = async (req, res, next) => {
    try{
        if(!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).send({message: 'ID inválido'});

        const user = await userServices.showService(req.params.id);

        if(!user) return res.status(400).send({message: 'ID não encontrado!'});

        req.user = user;
        next();
    }catch (err) {
        console.log(err);
        res.status(500).send({message: err.message});
    };
};

export const postIdValidation = async (req, res, next) => {
    try{
        const {id} = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).send({message: 'ID inválido'});

        const post = await questionPostServices.showService(id);

        if(!post) return res.status(400).send({message: 'ID não encontrado!'});

        req.post = post;
        next();
    }catch (err) {
        console.log(err);
        console.log();
        console.log(err.message);
        res.status(500).send({message: 'Erro inesperado na requisição!'});
    };
};
