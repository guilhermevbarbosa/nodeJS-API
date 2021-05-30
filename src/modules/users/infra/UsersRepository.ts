import { getRepository, Repository } from "typeorm";

import IUsersRepository from "../IUsersRepository";
import User from "../../../models/User";
import ErrorMessage from "../../../shared/errors/errorMessage";
import ConvertPassService from "../../../services/utils/Crypto/ConvertPassService";
import CryptoDTO from "../../../models/dto/searchedUser/CryptoDTO";

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;
  private convertPassService: ConvertPassService;

  constructor() {
    this.ormRepository = getRepository(User);
    this.convertPassService = new ConvertPassService();
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.ormRepository.findOne({
      where: { email: email },
    });
  }

  public async findById(uid: any): Promise<User | undefined> {
    uid = Object.values(uid);

    return this.ormRepository.findOne({
      where: { id: uid },
    });
  }

  public async create(userData: any): Promise<string> {
    const user = this.ormRepository.create(userData);
    const savedUser = await this.ormRepository.save(user);

    if (!savedUser) {
      throw new ErrorMessage("Não foi possível criar o usuário");
    }

    return "Criado com sucesso!";
  }

  public async handleCrypto(password: string): Promise<CryptoDTO> {
    const cryptoData = await this.convertPassService.crypto(password);

    const hashedPass = cryptoData.cryptoPass;
    const salt = cryptoData.saltPass;

    return {
      hashedPass,
      salt,
    };
  }
}

export default UsersRepository;
