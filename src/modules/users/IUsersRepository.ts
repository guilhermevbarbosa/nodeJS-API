import CryptoDTO from "../../models/dto/searchedUser/Crypto";
import UserCreate from "../../models/request/UserCreate";

export default interface IUsersRepository {
  findByEmail(email: string): Promise<void>;
  create(userData: any): Promise<string>;
  handleCrypto(userRequest: UserCreate): Promise<CryptoDTO>;
}
