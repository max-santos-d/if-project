import mongoose from "mongoose";

const EventPostSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    text: {
        type: String,
        require: true,
    },
    banner: {
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
},
    // Adicionando campos created_at e updated_at automaticamente
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    },
);

const EventPost = mongoose.model('EventPost', EventPostSchema);

export default EventPost;
