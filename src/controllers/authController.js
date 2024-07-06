import bcrypt from 'bcrypt';

import { loginService, genereteTokenService } from '../services/authServices.js';

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(404).send({ message: 'Email e Senha requerida!' });
    
    try {
        const userLogin = await loginService(email);

        if (!userLogin) return res.status(404).send({ message: 'Usuário não encontrado!' });
        
        const passwordValidation = bcrypt.compareSync(password, userLogin.password);

        if (!passwordValidation) return res.status(404).send({ message: 'Usuário não encontrado!' });

        const token = genereteTokenService(userLogin._id);

        res.status(200).send({token});
    } catch (err) {
        console.log(err);
        res.status(404).send({ message: 'Erro inesperado ao realizar requisição!' });
    };
};
