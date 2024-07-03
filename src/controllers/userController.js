import userServices from "../services/userServices.js";

const store = async (req, res) => {
    try {
        const { name, username, email, password, avatar } = req.body;

        if (!name || !username || !email || !password || !avatar)
            return res.send({ message: 'Campos obrigatórios em falta!' });

        const user = await userServices.storeService(
            name,
            username,
            email,
            password,
            avatar
        );

        if (!user) return res.status(400).send({ message: 'Erro ao criar usuário!' });

        res.status(200).send(user);

    } catch (err) {
        console.log(err);
        res.status(400).send({ message: err.message });
    };
};

const index = async (req, res) => {
    try {
        const users = await userServices.indexService();

        return res.status(200).send(users);
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: err.message });
    };
};

const show = async (req, res) => {
    try {
        return res.status(200).send(req.user);
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: err.message });
    };
};

const update = async (req, res) => {
    try {
        const { name, username, email, password, avatar } = req.body;
        const id = req.user._id;

        if (!name && !username && !email && !password && !avatar) return res.status(400).send({ message: 'Ao menos um campo de ve ser informado!' });

        await userServices.updateService(
            id,
            name,
            username,
            email,
            password,
            avatar,
        );

        return res.status(200).send({ message: 'Usuário atualizado!' });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: err.message });
    };
};

const erase = async (req, res) => {
    try {
        const deleteUser = await userServices.deleteService(req.user._id);

        return res.status(200).send(deleteUser);
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: err.message });
    };
};

const updateTypeUser = async (req, res) => {
    try {
        const { userId } = req;
        const { userUpdate } = req;
        const { query: { type } } = req;
        const userReq = await userServices.showService(userId);

        console.log(userReq);

        if (!type) return res.status(400).send({ message: 'Parâmetro de tipo de usuário deve ser informado!' });

        switch (type) {
            case 'organization':
                await userServices.promotionOrganizationService(userUpdate._id);
                break;
            case 'administrator':
                await userServices.promotionAdministratorService(userUpdate._id);
                break;
            case 'downOrganization':
                await userServices.downgradeOrganizationService(userUpdate._id);
                break;
            case 'downAdministrator':
                await userServices.downgradeAdministratorService(userUpdate._id);
                break;
            default:
                return res.status(400).send({ message: 'Parâmetro para Modificação inválida' });
        };

        return res.status(200).send({ message: 'Usuário atualizado!' });
    } catch (err) {
        console.log(err);
        res.status(400).send({ message: "Erro inesperado ao realizar ação!" });
    };
};

export default {
    store,
    index,
    show,
    update,
    erase,
    updateTypeUser,
};