import questionPostService from '../services/questionPostServices.js';

const store = async (req, res) => {
    try {
        const { text, img, tags } = req.body;

        if (!text || !tags) return res.status(400).send({ message: 'Campos obrigatórios em falta!' });

        await questionPostService.store({
            text,
            tags,
            img,
            user: '66858d2416c4d840f458dbac',
        });

        return res.status(200).send({ message: 'Pergunta publicada!' });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ message });
    }
};

const index = async (req, res) => {
    try {
        const data = await questionPostService.index();

        if (!data) return res.status(200).send({ message: 'Nenhuma publicação encontrada!' });

        return res.status(200).send(data);
    } catch (err) {
        console.log(err);
        return res.status(400).send({ message: 'Erro inesperado ao realizar requisição!' });
    };
};

export default {
    store,
    index,
};