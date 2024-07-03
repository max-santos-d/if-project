import EventPost from '../models/EventPost.js';

const store = (body) => EventPost.create(body);

export default {
    store,
};