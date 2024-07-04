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
        const { _id: idToken } = req.userId;
        const { _id: idReq } = req.user;

        if (!name && !username && !email && !password && !avatar)
            return res.status(400).send({ message: 'Ao menos um campo de ve ser informado!' });

        if(String(idToken) !== String(idReq)) return res.status(400).send({ message: 'Falha na requisição - Você não tem acesso ao usuário!' });

        await userServices.updateService(
            idReq,
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
        const { _id: idToken } = req.userId;
        const { _id: idReq } = req.user;

        if(String(idToken) !== String(idReq)) return res.status(400).send({ message: 'Falha na requisição - Você não tem acesso ao usuário!' });
        
        await userServices.deleteService(req.user._id);

        return res.status(200).send({ message: 'Usuário Apagado!' });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: err.message });
    };
};

const updateTypeUser = async (req, res) => {
    try {
        const { userUpdateId } = req;
        const { requestUserId } = req;
        const { query: { type } } = req;

        if (!type) return res.status(400).send({ message: 'Parâmetro de tipo de usuário deve ser informado!' });

        switch (type) {
            case 'organization':
                await userServices.promotionOrganizationService(userUpdateId);
                break;
            case 'administrator':
                await userServices.promotionAdministratorService(userUpdateId);
                break;
            case 'downOrganization':
                await userServices.downgradeOrganizationService(userUpdateId);
                break;
            case 'downAdministrator':

                const { typeUser: typeUserUpdate } = await userServices.showService(userUpdateId);
                const { typeUser: typeUserRequest } = await userServices.showService(requestUserId);
                const [administratorUserUpdate] = typeUserUpdate.filter(el => (el.type === 'administrator'));
                const [administratorUserRequest] = typeUserRequest.filter(el => (el.type === 'administrator'));

                if (administratorUserRequest.createdAt < administratorUserUpdate.createdAt) return res.status(400).send({ message: 'Não é possivel realizar a operação por o usuário ter criação mais antiga' });

                await userServices.downgradeAdministratorService(userUpdateId);
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