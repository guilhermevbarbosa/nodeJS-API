import { v4 as uuidv4 } from "uuid";

import CryptoDTO from "../../../models/dto/searchedUser/Crypto";
import UserCreate from "../../../models/request/UserCreate";
import User from "../../../models/User";
import ErrorMessage from "../../../shared/errors/errorMessage";
import IUsersRepository from "../IUsersRepository";
import ConvertPassService from "../../../services/utils/Crypto/ConvertPassService";

class UsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findByEmail(email: string): Promise<void> {
    const searchIfEmailExists = this.users.find((user) => user.email === email);

    if (searchIfEmailExists) {
      throw new ErrorMessage("E-mail já cadastrado");
    }
  }

  public async create(userData: any): Promise<string> {
    const user = new User();

    if (!user) {
      throw new ErrorMessage("Não foi possível criar o usuário");
    }

    Object.assign(user, { id: uuidv4() }, userData);
    this.users.push(user);

    return "Criado com sucesso!";
  }

  public async handleCrypto(userRequest: UserCreate): Promise<CryptoDTO> {
    let convertPassService = new ConvertPassService();

    const cryptoData = await convertPassService.crypto(userRequest.password);

    const hashedPass = cryptoData.cryptoPass;
    const salt = cryptoData.saltPass;

    return {
      hashedPass,
      salt,
    };
  }
}

export default UsersRepository;
