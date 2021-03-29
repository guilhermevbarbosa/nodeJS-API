import UserCreate from "../../models/request/UserCreate";

import { inject, injectable } from "tsyringe";
import IUsersRepository from "../../modules/users/IUsersRepository";
@injectable()
export default class CreateUsersService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {
    console.log(this.usersRepository);
  }

  async create(userRequest: UserCreate) {
    this.usersRepository.teste();

    // await this.usersRepository.findByEmail(userRequest.email);
    // const cryptoData = await this.usersRepository.handleCrypto(userRequest);
    // userRequest.password = cryptoData.hashedPass;
    // const salt = cryptoData.salt;
    // const data = {
    //   ...userRequest,
    //   salt,
    // };
    // const createdMessage = await this.usersRepository.create(data);
    // return createdMessage;
  }
}
