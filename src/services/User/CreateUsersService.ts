import { Response } from "express";
import { getRepository } from "typeorm";

import User from "../../models/User";
import ErrorMessage from "../../errors/errorMessage";

import UserCreate from "../../models/request/UserCreate";
import CryptoService from "../utils/CryptoService";

const crypto = new CryptoService();

export default class CreateUsersService {
  async create(userRequest: UserCreate, response: Response) {
    await searchEmail(userRequest.email);
    const userObj = await handleCrypto(userRequest);
    const created = await createDB(userObj);

    return response.status(200).json(created);
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
  const cryptoData = await crypto.convertPass(userRequest.password);

  const hashedPass = cryptoData.cryptoPass;
  const salt = cryptoData.saltPass;

  userRequest.password = hashedPass;

  let data = {
    ...userRequest,
    salt,
  };

  return data;
}

async function createDB(userData: any) {
  const userRepo = getRepository(User);
  const user = userRepo.create(userData);
  const savedUser = await userRepo.save(user);

  if (!savedUser) {
    throw new ErrorMessage("Não foi possível criar o usuário");
  }

  return savedUser;
}
