import crypto from "crypto";

export default class SaltMakerService {
  async salt(length: number) {
    return crypto
      .randomBytes(Math.ceil(length / 2))
      .toString("hex")
      .slice(0, 16);
  }
}
