import { Response } from "express";
import { getRepository } from "typeorm";

import ErrorMessage from "../../errors/errorMessage";

import User from "../../models/User";
import UserLogin from "../../models/request/UserLogin";

import convertSearchedUser from "../../models/dto/searchedUser/ConvertSearchedUser";
import SearchedUser from "../../models/dto/searchedUser/SearchedUser";

import jwt from "jsonwebtoken";

export default class LoginUsersService {
  async login(userRequest: UserLogin, response: Response) {
    const verifyEmailUser = await searchEmail(userRequest.email);
    const userData = convertSearchedUser.convert(verifyEmailUser);
    const jwtToken = await verifyLogin(userData, userRequest.password);

    response.json({
      auth: true,
      token: jwtToken,
    });
  }

  async logout(request: Request, response: Response) {
    response.json({ auth: false, token: null });
  }
}

async function searchEmail(email: string) {
  const userRepo = getRepository(User);

  const searchIfEmailExists = await userRepo.findOne({
    where: { email: email },
  });

  if (searchIfEmailExists) {
    return searchIfEmailExists;
  } else {
    throw new ErrorMessage("O E-mail informado não existe");
  }
}

async function verifyLogin(
  searchedUser: SearchedUser,
  requestPassword: string
) {
  const testPasswords = searchedUser.password == requestPassword ? true : false;

  const loggedId = searchedUser.id;
  const secret = String(process.env.SECRET);

  if (testPasswords) {
    try {
      const token = jwt.sign({ loggedId }, secret, {
        expiresIn: 86400000,
      });

      return token;
    } catch (error) {
      throw new ErrorMessage("Erro no login");
    }
  } else {
    throw new ErrorMessage("Senha incorreta");
  }
}
