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

  public async update(id: string, userData: any): Promise<any> {
    const email = userData.email;

    const userBD = await this.ormRepository.findOne({
      where: { email: email },
    });

    if (userBD) {
      const bdId = String(userBD.id);

      if (bdId !== id) {
        return {
          status: 400,
          message: 'E-mail em uso'
        }
      }
    }

    const userCPFBD = await this.ormRepository.findOne({
      where: { cpf_cnpj: userData.cpf_cnpj },
    });

    if (userCPFBD) {
      const bdId = String(userCPFBD.id);

      if (bdId !== id) {
        return {
          status: 400,
          message: 'CPF em uso'
        }
      }
    }

    try {
      await this.ormRepository.update(id, userData);

      return {
        status: 200,
        message: 'Atualizado com sucesso'
      }
    } catch (error) {
      return error;
    }
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
