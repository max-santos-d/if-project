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


export default {
    store,
    index,
};
