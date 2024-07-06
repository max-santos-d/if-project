import User from "../models/User.js";

const storeService = (name, username, email, password, avatar) =>
    User.create({ name, username, email, password, avatar });

const indexService = () => User.find().sort({_id: -1});

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


const deleteService = (id) => User.findByIdAndDelete({ _id: id });

const promotionOrganizationService = (id) => User.findOneAndUpdate(
    { _id: id, 'userType.type': { $nin: ['organization'] } },
    { $push: { userType: { type: 'organization', created_at: new Date() } } }
);

const promotionAdministratorService = (id) => User.findOneAndUpdate(
    { _id: id, 'userType.type': { $nin: ['administrator'] } },
    { $push: { userType: { type: 'administrator', created_at: new Date() } } }
);

const downgradeOrganizationService = (id) => User.findOneAndUpdate(
    { _id: id },
    { $pull: { userType: { type: 'organization' } } }
);

const downgradeAdministratorService = (id) => User.findOneAndUpdate(
    { _id: id },
    { $pull: { userType: { type: 'administrator' } } }
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
