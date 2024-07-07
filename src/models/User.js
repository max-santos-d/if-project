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
    userType: {
        type: Array,
        require: true,
    },
    avatar: {
        type: String,
        require: true,
    },
    status: {
        type: Boolean,
        default: true,
    },
},
    // Adicionando campos created_at e updated_at automaticamente
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
);

UserSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 8);
    next();
});

const User = mongoose.model('User', UserSchema);

export default User;