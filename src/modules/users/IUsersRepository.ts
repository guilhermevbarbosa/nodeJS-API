import CryptoDTO from "../../models/dto/searchedUser/Crypto";
import User from "../../models/User";

export default interface IUsersRepository {
  findByEmail(email: string): Promise<User | undefined>;
  create(userData: any): Promise<string>;
  handleCrypto(password: string): Promise<CryptoDTO>;
}
