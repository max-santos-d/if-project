import QuestionPost from '../models/QuestionPost.js';

const store = (body) => QuestionPost.create(body);

const index = () => QuestionPost.find();

export default {
    store,
    index,
}