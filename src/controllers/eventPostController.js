import mongoose from 'mongoose';

import eventPostServices from '../services/eventPostServices.js';

const store = async (req, res) => {
    try {
        const { title, text, banner } = req.body;
        const { requestUserTokenId } = req;

        if (!title || !text || !banner)
            return res.send({ message: "Campos obrigatórios em falta!" });

        await eventPostServices.store({
            title,
            text,
            banner,
            user: requestUserTokenId,
        });

        return res.status(201).send({ message: 'Post publicado!' });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ message: err.message })
    };
};

const index = async (req, res) => {

    try {
        const eventPost = await eventPostServices.indexService();

        if (!eventPost.length) return res.status(200).send({ message: 'Nenhuma publicação encontrada!' });

        return res.status(200).send(eventPost.map(item => ({
            id: item._id,
            title: item.title,
            text: item.text,
            banner: item.banner,
            likes: item.likes,
            user: {
                name: item.user?.name,
                userName: item.user?.username,
                userAvatar: item.user?.avatar,
            },
            created_at: item.created_at,
            updated_at: item.updated_at,
        })));

    } catch (err) {
        console.log(err);
        return res.send({ message: 'Erro inesperado ao realizar requisição!' })
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
                            name: eventPost.user?.name,
                            userName: eventPost.user?.username,
                            userAvatar: eventPost.user?.avatar,
                        },
                        created_at: eventPost.created_at,
                        updated_at: eventPost.updated_at,
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
                        name: eventPost.user?.name,
                        userName: eventPost.user?.username,
                        userAvatar: eventPost.user?.avatar,
                    },
                    created_at: eventPost.created_at,
                    updated_at: eventPost.updated_at,
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
                        name: item.user?.name,
                        userName: item.user?.username,
                        userAvatar: item.user?.avatar
                    },
                    created_at: item.created_at,
                    updated_at: item.updated_at,
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
        if (!title && !text && !banner) return res.status(400).send({ message: 'Ao menos um campo obrigatório deve ser informado: title, text ou banner.' })

        const eventPostSearch = await eventPostServices.showService(req.params.id);
        if (!eventPostSearch) return res.status(400).send({ message: 'Post não encontrado!' });

        await eventPostServices.updateService(
            eventPostSearch._id,
            title,
            text,
            banner,
        );

        return res.status(200).send({ message: 'Post atualizado!' });
    } catch (err) {
        console.log(err);
        res.status(400).send({ message: 'Erro inesperado na requisição!' });
    }
};

const erase = async (req, res) => {
    try {
        const eventPostSearch = await eventPostServices.showService(req.params.id);

        if (!eventPostSearch) return res.status(400).send({ message: 'Post não encontrado!' });

        await eventPostServices.eraseService(eventPostSearch._id);
        res.status(200).send({ message: 'Post Apagado!' });
    } catch (err) {
        console.log(err);
        res.status(400).send({ message: err.message });
    }
};

const like = async (req, res) => {

    try {
        const { params: { id } } = req;
        const { requestUserTokenId } = req;

        const like = await eventPostServices.likeService(id, requestUserTokenId);

        if (!like) {
            await eventPostServices.deleteLikeService(id, requestUserTokenId);
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
