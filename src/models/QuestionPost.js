import mongoose from 'mongoose';

const QuestionPostSchema = new mongoose.Schema({
    text: {
        type: String,
        require: true,
    },
    img: [{
        type: String
    }],
    tags: [{
        type: String,
        require: true,
    }],
    createdAt: {
        type: String,
        default: Date.now(),
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    likes: {
        type: Array,
        require: true,
    },
});

const QuestionPost = mongoose.model('QuestionPost', QuestionPostSchema);

export default QuestionPost;