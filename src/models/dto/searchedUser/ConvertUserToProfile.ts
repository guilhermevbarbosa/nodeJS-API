import User from "../../User";

export default {
    convert(user: User) {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            tel: user.tel,
            cpf_cnpj: user.cpf_cnpj,
            cep: user.cep,
            address: user.address,
            state: user.state,
            city: user.city,
            account_type: user.account_type,
        };
    },
};
