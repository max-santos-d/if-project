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
        const data = await questionPostService.indexService();

        if (!data) return res.status(200).send({ message: 'Nenhuma publicação encontrada!' });

        return res.status(200).send(
            data.map(key => (
                {
                    id: key._id,
                    text: key.text,
                    img: key.img,
                    tags: key.tags,
                    status: key.status,
                    user: {
                        name: key.user.name,
                        username: key.user.username,
                        avatar: key.user.avatar,
                    },
                    likes: key.likes,
                    created_at: key.created_at,
                    updated_at: key.updated_at,
                }
            )),
        );        
    } catch (err) {
        console.log(err);
        return res.status(400).send({ message: 'Erro inesperado ao realizar requisição!' });
    };
};

const show = async (req, res) => {
    try {
        const { post } = req;

        return res.status(200).send({
            response: {
                id: post._id,
                text: post.text,
                img: post.img,
                tags: post.tags,
                user: {
                    name: post.user.name,
                    userName: post.user.username,
                    userAvatar: post.user.avatar,
                },
                likes: post.likes,
            },
        });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ message: 'Erro inisperado ao realizar requisição!' });
    };
};

export default {
    store,
    index,
    show,
};