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

export default {
    store,
    indexService,
    showLastService,
    showService,
    showByTitleService,
};