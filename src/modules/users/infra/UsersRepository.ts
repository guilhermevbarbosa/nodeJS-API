import { getRepository, Repository } from "typeorm";

import IUsersRepository from "../IUsersRepository";
import User from "../../../models/User";
import ErrorMessage from "../../../shared/errors/errorMessage";
import UserCreate from "../../../models/request/UserCreate";
import ConvertPassService from "../../../services/utils/Crypto/ConvertPassService";
import CryptoDTO from "../../../models/dto/searchedUser/Crypto";

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;
  private convertPassService: ConvertPassService;

  constructor() {
    this.ormRepository = getRepository(User);
    this.convertPassService = new ConvertPassService();
  }

  public async findByEmail(email: string): Promise<void> {
    const searchIfEmailExists = await this.ormRepository.findOne({
      where: { email: email },
    });

    if (searchIfEmailExists) {
      throw new ErrorMessage("E-mail já cadastrado");
    }
  }

  public async create(userData: any): Promise<string> {
    const user = this.ormRepository.create(userData);
    const savedUser = await this.ormRepository.save(user);

    if (!savedUser) {
      throw new ErrorMessage("Não foi possível criar o usuário");
    }

    return "Criado com sucesso!";
  }

  public async handleCrypto(userRequest: UserCreate): Promise<CryptoDTO> {
    const cryptoData = await this.convertPassService.crypto(
      userRequest.password
    );

    const hashedPass = cryptoData.cryptoPass;
    const salt = cryptoData.saltPass;

    return {
      hashedPass,
      salt,
    };
  }

  teste() {
    console.log("teste");
  }
}

export default UsersRepository;
