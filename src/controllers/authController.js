import bcrypt from 'bcrypt';

import { loginService } from '../services/authServices.js';

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(404).send({ message: 'Email e Senha requerida!' });
    
    console.log(req.body);

    try {
        const user = await loginService(email);
        
        if (!user) return res.status(404).send({ message: 'Usuário ou senha incorreta!' });
        
        const passwordIsValisd = bcrypt.compareSync(password, user.password);

        if (!passwordIsValisd) return res.status(404).send({ message: 'Usuário ou senha incorreta!' });

        res.status(200).send(user);
    } catch (err) {
        console.log(err);
        res.status(404).send({ message: err.message });
    };
};
