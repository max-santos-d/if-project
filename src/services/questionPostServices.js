import QuestionPost from '../models/QuestionPost.js';

const store = (body) => QuestionPost.create(body);

export default {
    store,
}