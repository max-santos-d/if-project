import EventPost from '../models/EventPost.js';

const store = (body) => EventPost.create(body);

const indexService = () => EventPost.find().sort({ _id: -1}).populate('user');

const showLastService = () => EventPost.findOne().sort({ _id: -1}).populate('user');

export default {
    store,
    indexService,
    showLastService,
};