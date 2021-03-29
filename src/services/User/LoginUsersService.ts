import { Response } from "express";
import { getRepository } from "typeorm";

import ErrorMessage from "../../shared/errors/errorMessage";

import User from "../../models/User";
import UserLogin from "../../models/request/UserLogin";

import convertSearchedUser from "../../models/dto/searchedUser/ConvertSearchedUser";
import SearchedUser from "../../models/dto/searchedUser/SearchedUser";

import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

import Sha512ConverterService from "../utils/Crypto/Sha512ConverterService";
const sha512ConverterService = new Sha512ConverterService();

export default class LoginUsersService {
  async login(userRequest: UserLogin, response: Response) {
    const verifyEmailUser = await searchEmail(userRequest.email);
    const foundUserData = convertSearchedUser.convert(verifyEmailUser);

    const jwtToken = await verifyLogin(foundUserData, userRequest.password);

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
  const passwordAndSalt = await sha512ConverterService.sha512(
    requestPassword,
    searchedUser.salt
  );

  const testPasswords =
    searchedUser.password === passwordAndSalt.nHash ? true : false;
  const loggedId = searchedUser.id;

  const privateKey = fs.readFileSync(
    path.join(__dirname, "..", "..", "..", "private.key"),
    "utf-8"
  );

  if (testPasswords) {
    return jwtSignin(privateKey, loggedId);
  } else {
    throw new ErrorMessage("Senha incorreta");
  }
}

async function jwtSignin(privateKey: string, loggedId: number) {
  try {
    const token = jwt.sign({ loggedId }, privateKey, {
      expiresIn: 86400000,
      algorithm: "RS256",
    });

    return token;
  } catch (error) {
    throw new ErrorMessage("Erro no login");
  }
}
