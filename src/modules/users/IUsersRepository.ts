import CryptoDTO from "../../models/dto/searchedUser/CryptoDTO";
import User from "../../models/User";

export default interface IUsersRepository {
  findByEmail(email: string): Promise<User | undefined>;
  findById(uid: string): Promise<User | undefined>;
  create(userData: any): Promise<string>;
  update(id: string, userData: any): Promise<any>;
  handleCrypto(password: string): Promise<CryptoDTO>;
}
