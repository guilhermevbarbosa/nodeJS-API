import crypto from "crypto";

export default class CryptoService {
  async convertPass(password: string) {
    const salt = await saltMaker(16);
    const passAndSalt = await sha512(password, salt);

    const cryptoPass = passAndSalt.nHash;
    const saltPass = passAndSalt.salt;

    return { cryptoPass, saltPass };
  }
}

async function saltMaker(length: number) {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, 16);
}

async function sha512(password: string, salt: any) {
  const hash = crypto.createHmac("sha512", salt);
  hash.update(password);

  const nHash = hash.digest("hex");

  return { salt, nHash };
}
