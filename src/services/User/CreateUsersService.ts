import { Response } from "express";
import { getRepository } from "typeorm";

import User from "../../models/User";
import ErrorMessage from "../../errors/errorMessage";

import UserCreate from "../../models/request/UserCreate";

import ConvertPassService from "../utils/Crypto/ConvertPassService";
const convertPassService = new ConvertPassService();

export default class CreateUsersService {
  async create(userRequest: UserCreate) {
    await searchEmail(userRequest.email);
    const userObj = await handleCrypto(userRequest);
    const created = await createInDB(userObj);

    return created;
  }
}

async function searchEmail(email: string) {
  const userRepo = getRepository(User);

  const searchIfEmailExists = await userRepo.findOne({
    where: { email: email },
  });

  if (searchIfEmailExists) {
    throw new ErrorMessage("E-mail já cadastrado");
  }
}

async function handleCrypto(userRequest: UserCreate) {
  const cryptoData = await convertPassService.crypto(userRequest.password);

  const hashedPass = cryptoData.cryptoPass;
  const salt = cryptoData.saltPass;

  userRequest.password = hashedPass;

  return {
    ...userRequest,
    salt,
  };
}

async function createInDB(userData: any) {
  const userRepo = getRepository(User);
  const user = userRepo.create(userData);
  const savedUser = await userRepo.save(user);

  if (!savedUser) {
    throw new ErrorMessage("Não foi possível criar o usuário");
  }

  return savedUser;
}
