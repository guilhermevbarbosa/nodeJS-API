import { v4 as uuidv4 } from "uuid";

import CryptoDTO from "../../../models/dto/searchedUser/Crypto";
import User from "../../../models/User";
import IUsersRepository from "../IUsersRepository";
import ConvertPassService from "../../../services/utils/Crypto/ConvertPassService";

class UsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findByEmail(email: string): Promise<User | undefined> {
    const searchIfEmailExists = this.users.find((user) => user.email === email);

    return searchIfEmailExists;
  }

  public async create(userData: User): Promise<string> {
    const user = new User();

    const crypto = await this.handleCrypto(userData.password)

    userData.password = crypto.hashedPass;
    userData.salt = crypto.salt;

    Object.assign(user, { id: uuidv4() }, userData);
    this.users.push(user);

    return "Criado com sucesso!";
  }

  public async handleCrypto(password: string): Promise<CryptoDTO> {
    let convertPassService = new ConvertPassService();

    const cryptoData = await convertPassService.crypto(password);

    const hashedPass = cryptoData.cryptoPass;
    const salt = cryptoData.saltPass;

    return {
      hashedPass,
      salt,
    };
  }
}

export default UsersRepository;
