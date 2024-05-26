import User from "../models/User.js";

const storeService = (name, username, email, password, avatar) => 
    User.create({name, username, email, password, avatar});

const indexService = () => User.find();

export default {
    storeService,
    indexService,
};