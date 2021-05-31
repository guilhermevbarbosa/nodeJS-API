import { inject, injectable } from "tsyringe";

import IUsersRepository from "../../modules/users/IUsersRepository";
import ErrorMessage from "../../shared/errors/errorMessage";

import ConvertUserToProfile from "../../models/dto/searchedUser/ConvertUserToProfile";

@injectable()
export default class UserDataService {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }

    async get(userId: string) {
        const userData = await this.usersRepository.findById(
            userId
        );

        if (!userData) {
            throw new ErrorMessage("Usuário não encontrado");
        }

        return ConvertUserToProfile.convert(userData);
    }

    async update(userId: string, userData: any) {
        return this.usersRepository.update(userId, userData);
    }
}
