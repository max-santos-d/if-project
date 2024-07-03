import mongoose from 'mongoose';

import eventPostServices from '../services/eventPostServices.js';

const store = async (req, res) => {
    try {
        const { title, text, banner } = req.body;
        const { userId } = req;

        console.log(userId);

        if (!title || !text || !banner)
            return res.send({ message: "Campos obrigatórios em falta!" });

        await eventPostServices.store({
            title,
            text,
            banner,
            user: userId,
        });

        return res.status(201).send({ message: 'Post cadastrado!' });
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
        return res.send({ message: 'Não há Posts cadastrados!' })
    };
};

const show = async (req, res) => {

    try {

        if (req.query.last) {
            if (req.query.last.toLowerCase() === 'true') {
                const eventPost = await eventPostServices.showLastService();

                if (!eventPost) return res.statatus(400).send({ message: 'Não há Posts cadastrados!' });

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

        if (req.query.id) {
            const eventPost = await eventPostServices.showService(req.query.id);

            if (!eventPost) return res.statatus(400).send({ message: 'Post não encontrado!' });

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

        if (req.query.title) {
            const eventPost = await eventPostServices.showByTitleService(req.query.title);

            if (!eventPost.length) return res.status(400).send({ message: 'Nenhum Post com o título' });

            return res.status(200).send({
                result: eventPost.map(item => ({
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
                })),
            });
        };

        return res.status(400).send({ message: 'Nenhum parâmetro informado.' });

    } catch (err) {
        console.log(err);
        return res.send({ message: 'Post não encontrado!' })
    };
};

const update = async (req, res) => {
    try {
        const { body: { title, text, banner } } = req;
        const postId = req.params.id || '';
        const validPostId = mongoose.Types.ObjectId.isValid(postId);

        if (!validPostId) return res.status(400).send({ message: 'ID de Post inválido!' });

        const eventPost = await eventPostServices.showService(postId);

        if (!eventPost) return res.status(400).send({ message: 'Post não encontrado!' });
        if (!title && !text && !banner) return res.status(400).send({ message: 'Ao menos um campo obrigatório deve ser informado: title, text ou banner.' })

        await eventPostServices.updateService(
            postId,
            title,
            text,
            banner,
        );

        return res.status(200).send({ message: 'Post atualizado!' });
    } catch (err) {
        console.log(err);
        res.status(400).send({ message: err.message });
    }
};

const erase = async (req, res) => {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).send({ message: 'ID Post inválido!' });

        const eventPost = await eventPostServices.showService(id);

        if (!eventPost) return res.status(400).send({ message: 'Post não encontrado!' });

        await eventPostServices.eraseService(id);
        res.status(200).send({ message: 'Post Apagado!' });

    } catch (err) {
        console.log(err);
        res.status(400).send({ message: err.message });
    }
};

const like = async (req, res) => {

    try {
        const { params: { id } } = req;
        const { userId } = req;

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).send({ message: 'ID Post inválido!' });

        const like = await eventPostServices.likeService(id, userId);

        if (!like) {
            await eventPostServices.deleteLikeService(id, userId);
            return res.status(200).send({ message: 'LIKE removido!' })
        };

        return res.status(200).send({ message: 'LIKE adicionado!' });

    } catch (err) {
        console.log(err);
        res.status(400).send({ message: err.message });
    }
};

export default {
    store,
    index,
    show,
    update,
    erase,
    like,
};
