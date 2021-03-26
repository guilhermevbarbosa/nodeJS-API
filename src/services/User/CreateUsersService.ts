import { Response } from "express";
import { getRepository } from "typeorm";

import User from "../../models/User";
import ErrorMessage from "../../errors/errorMessage";

import UserCreate from "../../models/request/UserCreate";
import UserLogin from "../../models/request/UserLogin";

export default class CreateUsersService {
  async create(userRequest: UserCreate, response: Response) {
    const userRepo = getRepository(User);

    await searchEmail(userRequest.email);

    const user = userRepo.create(userRequest);
    const savedUser = await userRepo.save(user);

    if (!savedUser) {
      throw new ErrorMessage("Não foi possível criar o usuário");
    }

    return response.status(200).json(savedUser);
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
