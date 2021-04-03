import UserCreate from "../../models/request/UserCreate";

import { inject, injectable } from "tsyringe";
import IUsersRepository from "../../modules/users/IUsersRepository";
import ErrorMessage from "../../shared/errors/errorMessage";

@injectable()
export default class CreateUsersService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }

  async create(userRequest: UserCreate) {
    const userEmailSearch = await this.usersRepository.findByEmail(userRequest.email);

    if (userEmailSearch) {
      throw new ErrorMessage("E-mail já cadastrado");
    }

    const cryptoData = await this.usersRepository.handleCrypto(userRequest.password);

    userRequest.password = cryptoData.hashedPass;

    const salt = cryptoData.salt;
    const data = {
      ...userRequest,
      salt,
    };

    const createdMessage = await this.usersRepository.create(data);
    return createdMessage;
  }
}
