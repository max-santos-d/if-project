import mongoose from "mongoose";

import userServices from "../services/userServices.js";

const isValid = async (req, res, next) => {
    try{
        if(!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).send({message: 'ID de usuário inválido'});

        const user = await userServices.showService(req.params.id);

        if(!user) return res.status(400).send({message: 'ID de Usuário não encontrado!'});

        req.user = user;
        next();
    }catch (err) {
        console.log(err);
        res.status(500).send({message: err.message});
    };
};

export default isValid;