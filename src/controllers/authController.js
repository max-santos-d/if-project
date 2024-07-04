import bcrypt from 'bcrypt';

import { loginService, genereteTokenService } from '../services/authServices.js';

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(404).send({ message: 'Email e Senha requerida!' });
    
    try {
        const user = await loginService(email);
        
        if (!user) return res.status(404).send({ message: 'Usuário não encontrado!' });
        
        const passwordIsValisd = bcrypt.compareSync(password, user.password);

        if (!passwordIsValisd) return res.status(404).send({ message: 'Usuário não encontrado!' });

        const token = genereteTokenService(user._id)

        res.status(200).send({token});
    } catch (err) {
        console.log(err);
        res.status(404).send({ message: err.message });
    };
};
