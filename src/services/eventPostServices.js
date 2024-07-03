import EventPost from '../models/EventPost.js';

const store = (body) => EventPost.create(body);

const indexService = () => EventPost.find().sort({ _id: -1 }).populate('user');

const showLastService = () => EventPost.findOne().sort({ _id: -1 }).populate('user');

const showService = (id) => EventPost.findById(id).populate('user');

// $regex - Fornece recursos de expressão regular para correspondência de padrões de strings em consultas.
// $options: 'i' - Insensibilidade a maiúsculas e minúsculas.
const showByTitleService = (title) => EventPost.find(
    {
        title: { $regex: `${title || ''}`, $options: 'i' }, 
    })
    .sort({ _id: -1 }).populate('user');

const updateService = (id, title, text, banner) => EventPost.findByIdAndUpdate({ _id: id }, { title, text, banner });

const eraseService = (id) => EventPost.findByIdAndDelete({ _id: id });

/*$nin - seleciona os documentos onde:
    - o valor do campo especificado não está na matriz especificada ou
    - o campo especificado não existe.
*/
// $push - operador que acrescenta um valor especificado a uma matriz.
const likeService = (postId, userId) => EventPost.findOneAndUpdate(
    { _id: postId, 'likes.userId': { $nin: [userId] } },
    { $push: { likes: { userId, createdAt: new Date() } } }
);

const deleteLikeService = (postId, userId) => EventPost.findOneAndUpdate(
    { _id: postId },
    { $pull: { likes: { userId } } }
);

export default {
    store,
    indexService,
    showLastService,
    showService,
    showByTitleService,
    updateService,
    eraseService,
    likeService,
    deleteLikeService,
};