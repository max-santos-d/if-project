// import mongoose from 'mongoose';
import eventPostServices from '../services/eventPostServices.js';

const store = async (req, res) => {
    try {
        const { title, text, banner } = req.body;

        if (!title || !text || !banner)
            return res.send({ message: "Campos obrigatórios em falta!" });

        await eventPostServices.store({
            title,
            text,
            banner,
            user: "66539b63b2d59341761156d4",
        });

        return res.status(201).send({ message: 'Notícia cadastrada!' });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ message: err.message })
    };
};

const index = async (req, res) => {

    try {
        const eventPost = await eventPostServices.indexService();

        return res.status(200).send(eventPost.map(item => ({
            id: item._id,
            title: item.title,
            text: item.text,
            banner: item.banner,
            likes: item.likes,
            user: {
                name: item.user.name,
                userName: item.user.username,
                userAvatar: item.user.avatar
            }
        })));

    } catch (err) {
        console.log(err);
        return res.send({ message: 'Não há notícias cadastradas!' })
    };
};

const show = async (req, res) => {

    try {

        if (req.query.id) {
            const eventPost = await eventPostServices.showService(req.query.id);

            if (!eventPost) return res.statatus(400).send({ message: 'Noticia não encontrada!' });

            return res.status(200).send({
                eventPost: {
                    id: eventPost._id,
                    title: eventPost.title,
                    text: eventPost.text,
                    banner: eventPost.banner,
                    likes: eventPost.likes,
                    user: {
                        name: eventPost.user.name,
                        userName: eventPost.user.username,
                        userAvatar: eventPost.user.avatar,
                    }
                },
            });
        };

        if (req.query.last) {
            if (req.query.last.toLowerCase() === 'true') {
                const eventPost = await eventPostServices.showLastService();

                if (!eventPost) return res.statatus(400).send({ message: 'Não há notícias cadastradas!' });

                return res.status(200).send({
                    eventPost: {
                        id: eventPost._id,
                        title: eventPost.title,
                        text: eventPost.text,
                        banner: eventPost.banner,
                        likes: eventPost.likes,
                        user: {
                            name: eventPost.user.name,
                            userName: eventPost.user.username,
                            userAvatar: eventPost.user.avatar,
                        }
                    },
                });
            };
        };

        return res.status(400).send({ message: 'Nenhum parâmetro informado.' });

    } catch (err) {
        console.log(err);
        return res.send({ message: 'Noticia não encontrada!' })
    };
};

export default {
    store,
    index,
    show,
};
