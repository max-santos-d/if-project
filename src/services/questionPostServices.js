import QuestionPost from '../models/QuestionPost.js';

const storeService = (body) => QuestionPost.create(body);

const indexService = () => QuestionPost.find().sort({ _id: -1 }).populate('user');

const showService = (id) => QuestionPost.findById(id).populate('user');

const updateService = (_id, text) => QuestionPost.findByIdAndUpdate({ _id }, { text });

const deleteService = (_id, text) => QuestionPost.findByIdAndDelete({ _id });

export default {
    storeService,
    indexService,
    showService,
    updateService,
    deleteService,
};