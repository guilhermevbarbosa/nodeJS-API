import crypto from "crypto";

export default class Sha512ConverterService {
  async sha512(password: string, salt: any) {
    const hash = crypto.createHmac("sha512", salt);
    hash.update(password);

    const nHash = hash.digest("hex");

    return { salt, nHash };
  }
}
