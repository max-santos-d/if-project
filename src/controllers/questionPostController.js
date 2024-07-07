import questionPostService from '../services/questionPostServices.js';

const store = async (req, res) => {
    try {
        const { text } = req.body;
        const { requestUserTokenId } = req;

        if (!text) return res.status(400).send({ message: 'Campos obrigatórios em falta!' });

        await questionPostService.storeService({
            text,
            user: requestUserTokenId,
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

        if (!data.length) return res.status(200).send({ message: 'Nenhuma publicação encontrada!' });

        return res.status(200).send(
            data.map(key => (
                {
                    id: key._id,
                    text: key.text,
                    status: key.status,
                    user: {
                        name: key.user?.name,
                        username: key.user?.username,
                        avatar: key.user?.avatar,
                    },
                    likes: key.likes,
                    comments: key.comments,
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
        const post = await questionPostService.showService(req.params.id);

        return res.status(200).send({
            response: {
                id: post._id,
                text: post.text,
                user: {
                    name: post.user?.name,
                    userName: post.user?.username,
                    userAvatar: post.user?.avatar,
                },
                likes: post.likes,
                comments: post.comments,
                created_at: post.created_at,
                updated_at: post.updated_at,
            },
        });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ message: 'Erro inisperado ao realizar requisição!' });
    };
};

const update = async (req, res) => {
    try {
        const { _id: tokenId } = req.requestUserTokenId;
        const { id } = req.params;
        const { text } = req.body;

        if (!text) return res.status(400).send({ message: 'Compo obrigatório <text> não informado!' });
        
        const updatePost = await questionPostService.showService(id);
        
        if (!updatePost) return res.status(400).send({ message: 'Post para edição não encontrado!' });

        const postUserIdUpdate = updatePost.user?._id || '';

        if (!postUserIdUpdate) return res.status(400).send({ message: 'Post sem usuário definido!' });
        if (String(tokenId) !== String(postUserIdUpdate)) return res.status(400).send({ message: 'Usuário não correspondente com o criador do Post!' });

        await questionPostService.updateService(req.params.id, text);
        return res.status(200).send({ message: 'Post atualizado!' });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ message: 'Erro inesperado ao realizar requisição!' });
    };
};

const erase = async (req, res) => {
    try {
        const { _id: tokenId } = req.requestUserTokenId;
        const { id } = req.params;
        const deletePost = await questionPostService.showService(id);
        
        if (!deletePost) return res.status(400).send({ message: 'Post para apagar não encontrado!' });

        const postUserIdDelete = deletePost.user?._id || '';

        if (!postUserIdDelete) return res.status(400).send({ message: 'Post sem usuário definido!' });
        if (String(tokenId) !== String(postUserIdDelete)) return res.status(400).send({ message: 'Usuário não correspondente com o criador do Post!' });
        
        await questionPostService.deleteService(id);
        return res.status(200).send({ message: 'Post apagado!' });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ message: 'Erro inesperado ao realizar requisição!' });
    };
};

export default {
    store,
    index,
    show,
    update,
    erase,
};