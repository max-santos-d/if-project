import User from "../models/User.js";

const storeService = (name, username, email, password, avatar) => 
    User.create({name, username, email, password, avatar});

const indexService = () => User.find();

const showService = (id) => User.findById(id);

export default {
    storeService,
    indexService,
    showService,
};