import QuestionPost from '../models/QuestionPost.js';

const storeService = (body) => QuestionPost.create(body);

const indexService = () => QuestionPost.find();

const showService = (id) => QuestionPost.findById(id).populate('user');

export default {
    storeService,
    indexService,
    showService,
}