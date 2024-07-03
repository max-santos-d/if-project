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
        typeUser,
        avatar,
    });


const deleteService = (id) => User.findByIdAndDelete({ _id: id });

const promotionOrganizationService = (id) => User.findOneAndUpdate(
    { _id: id, 'typeUser.type': { $nin: ['organization'] } },
    { $push: { typeUser: { type: 'organization', createdAt: new Date() } } }
);

const promotionAdministratorService = (id) => User.findOneAndUpdate(
    { _id: id, 'typeUser.type': { $nin: ['administrator'] } },
    { $push: { typeUser: { type: 'administrator', createdAt: new Date() } } }
);

const downgradeOrganizationService = (id) => EventPost.findOneAndUpdate(
    { _id: id },
    { $pull: { typeUser: 'organization' } }
);

const downgradeAdministratorService = (id) => EventPost.findOneAndUpdate(
    { _id: id },
    { $pull: { typeUser: 'administrator' } }
);

export default {
    storeService,
    indexService,
    showService,
    updateService,
    deleteService,
    promotionOrganizationService,
    promotionAdministratorService,
    downgradeOrganizationService,
    downgradeAdministratorService,
};
