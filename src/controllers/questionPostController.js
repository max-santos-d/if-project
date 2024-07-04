import questionPostService from '../services/questionPostServices.js';

const store = async (req, res) => {
    try{
        const {text, tags } = req.body;

        if(!text || !tags ) return res.status(400).send({message: 'Campos obrigatórios em falta!'});

        await questionPostService.store({
            text,
            user: '66858d2416c4d840f458dbac',
            tags
        });
        
        return res.status(200).send({message: 'Pergunta publicada!'});
    } catch(err) {
        console.log(err);
        return res.status(400).send({message});
    }
};

export default {
    store,
};