import User from "../models/User.js";

const storeService = (name, username, email, password, avatar) =>
    User.create({ name, username, email, password, avatar });

const indexService = () => User.find();

const showService = (id) => User.findById(id);

const updateService = (
    id,
    name,
    username,
    email,
    password,
    avatar,
) => User.findByIdAndUpdate(
    { _id: id },
    {
        name,
        username,
        email,
        password,
        avatar,
    });

export default {
    storeService,
    indexService,
    showService,
    updateService,
};