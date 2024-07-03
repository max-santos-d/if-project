import User from "../models/User.js";

const storeService = (name, username, email, password, typeUser, avatar) =>
    User.create({ name, username, email, password, typeUser, avatar });

const indexService = () => User.find();

const showService = (id) => User.findById(id);


const updateService = (
    id,
    name,
    username,
    email,
    password,
    typeUser,
    avatar,
) => User.findByIdAndUpdate(
    { _id: id },
    {
        name,
        username,
        email,
        password,
        typeUser,
        avatar,
    });


const deleteService = (id) => User.findByIdAndDelete({_id: id});

export default {
    storeService,
    indexService,
    showService,
    updateService,
    deleteService,
};
