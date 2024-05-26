import userServices from "../services/userServices.js";

const store = async (req, res) => {
    try {
        const { name, username, email, password, avatar } = req.body;

        console.log(req.body);

        if (!name || !username || !email || !password || !avatar)
            return res.send({ message: 'Campos obrigatórios em falta!' });

        const user = await userServices.storeService(
            name,
            username,
            email,
            password,
            avatar
        );

        if(!user) return res.status(400).send({message: 'Erro ao criar usuário!'});
        
        res.status(200).send(user);

    } catch (err) {
        console.log(err);
        res.status(400).send({ message: err.message });
    }
};

export default {
    store,
};