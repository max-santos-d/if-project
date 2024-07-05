import QuestionPost from '../models/QuestionPost.js';

const storeService = (body) => QuestionPost.create(body);

const indexService = () => QuestionPost.find().sort({_id: -1}).populate('user');

const showService = (id) => QuestionPost.findById(id).populate('user');

export default {
    storeService,
    indexService,
    showService,
}