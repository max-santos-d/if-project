import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    username: {
        type: String,
        require: true,
        unique: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        require: true,
        select: false,
    },
    typeUser: {
        type: Array,
        require: true,
    },
    avatar: {
        type: String,
        require: true,
    },
    favoriteEvents: {
        type: Array,
        require: true,
    },
    favoriteQuestions: {
        type: Array,
        require: true,
    },
});

UserSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 8);
    next();
});

const User = mongoose.model('User', UserSchema);

export default User;