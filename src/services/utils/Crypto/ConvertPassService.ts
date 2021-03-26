import Sha512ConverterService from "./Sha512ConverterService";
import SaltMakerService from "./saltMakerService";

const sha512ConverterService = new Sha512ConverterService();
const saltMakerService = new SaltMakerService();

export default class ConvertPassService {
  async crypto(password: string) {
    const salt = await saltMakerService.salt(16);
    const passAndSalt = await sha512ConverterService.sha512(password, salt);

    const cryptoPass = passAndSalt.nHash;
    const saltPass = passAndSalt.salt;

    return { cryptoPass, saltPass };
  }
}
