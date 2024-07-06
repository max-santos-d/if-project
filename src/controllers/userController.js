import userServices from "../services/userServices.js";

const store = async (req, res) => {
    try {
        const { name, username, email, password, avatar } = req.body;

        if (!name || !username || !email || !password || !avatar)
            return res.send({ message: 'Campos obrigatórios em falta!' });

        const newUser = await userServices.storeService(
            name,
            username,
            email,
            password,
            avatar
        );

        if (!newUser) return res.status(400).send({ message: 'Erro ao criar usuário!' });

        res.status(200).send(newUser);

    } catch (err) {
        const messsageError = err.message.split(' ')

        if (messsageError[0] === 'E11000') res.status(400).send({ message: 'E-mail de usuário já existente!' });

        return res.status(500).send({ message: "Erro inesperado ao realizar ação!" });
    };
};

const index = async (req, res) => {
    try {
        const users = await userServices.indexService();

        if (!users.length) return res.status(200).send({ message: 'Nenhum usuário encontrado!' });



        return res.status(200).send(users.map(user => ({
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
            created_at: user.created_at,
            updated_at: user.updated_at,
        })));
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Erro inesperado ao realizar ação!" });
    };
};

const show = async (req, res) => {
    try {
        const { userParams: user } = req;

        if (!user) return res.status(400).send({ message: 'Usuário não encontrado!' });

        return res.status(200).send({
            response: {
                id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
                userType: user.userType,
                avatar: user.avatar,
                created_at: user.created_at,
                updated_at: user.updated_at,
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Erro inesperado ao realizar ação!" });
    };
};

const update = async (req, res) => {
    try {
        const { name, username, email, password, avatar } = req.body;
        const { _id: tokenId } = req.requestUserTokenId;

        if (!name && !username && !email && !password && !avatar)
            return res.status(400).send({ message: 'Ao menos um campo deve ser informado!' });

        // const { reqId } = req.userParams._id;
        // if (String(tokenId) !== String(reqId)) return res.status(400).send({ message: 'Falha na requisição - Você não tem acesso ao usuário!' });

        await userServices.updateService(
            tokenId,
            name,
            username,
            email,
            password,
            avatar,
        );

        return res.status(200).send({ message: 'Usuário atualizado!' });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Erro inesperado ao realizar ação!" });
    };
};

const erase = async (req, res) => {
    try {
        const { _id: tokenId } = req.requestUserTokenId;

        await userServices.deleteService(tokenId);

        return res.status(200).send({ message: 'Usuário Apagado!' });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Erro inesperado ao realizar ação!" });
    };
};

const userTypeUpdate = async (req, res) => {
    try {
        const { id: userUpdateId } = req.params;
        const { requestUserId } = req;
        const { query: { type } } = req;
        
        if (!type) return res.status(400).send({ message: 'Parâmetro de tipo de usuário deve ser informado!' });
        if (type !== 'organization' && type !== 'administrator' && type !== 'downOrganization' && type !== 'downAdministrator')
            return res.status(400).send({ message: 'Parâmetro informado inválido!' });

        const { userType: typeUserUpdate } = await userServices.showService(userUpdateId);
        const [administratorUserUpdate] = typeUserUpdate.filter(el => (el.type === 'administrator'));

        if(administratorUserUpdate) {
            const { userType: typeUserRequest } = await userServices.showService(requestUserId);
            const [administratorUserRequest] = typeUserRequest.filter(el => (el.type === 'administrator'));    

            if (administratorUserRequest.created_at > administratorUserUpdate.created_at) return res.status(400).send({ message: 'Não é possivel realizar a operação por o usuário ter administração mais antiga' });
        };

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
                await userServices.downgradeAdministratorService(userUpdateId);
                break;
            default:
                return res.status(400).send({ message: 'Parâmetro para Modificação inválida' });
        };

        return res.status(200).send({ message: 'Usuário atualizado!' });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Erro inesperado ao realizar ação!" });
    };
};

export default {
    store,
    index,
    show,
    update,
    erase,
    userTypeUpdate,
};