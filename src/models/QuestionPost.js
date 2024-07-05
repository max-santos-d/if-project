import mongoose from 'mongoose';

const QuestionPostSchema = new mongoose.Schema({
    text: {
        type: String,
        require: true,
    },
    status: {
        type: Boolean,
        default: true,
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
    comments: {
        type: Array,
        require: true,
    }
},
    // Adicionando campos created_at e updated_at automaticamente
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
);

const QuestionPost = mongoose.model('QuestionPost', QuestionPostSchema);

export default QuestionPost;