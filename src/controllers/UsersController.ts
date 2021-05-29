import { Request, Response } from "express";
import * as Yup from "yup";
import { container } from "tsyringe";

import ErrorMessage from "../shared/errors/errorMessage";
import LoginUsersService from "../services/User/LoginUsersService";

import CreateUsersService from "../services/User/CreateUsersService";
import VerifyJWTTokenService from "../services/utils/verifyJWTTokenService";

const loginUsersService = new LoginUsersService();
const verifyTokenService = new VerifyJWTTokenService();

export default class UsersController {
  async create(request: Request, response: Response) {
    const usersService = container.resolve(CreateUsersService);
    const body = request.body;

    const validation = Yup.object().shape({
      name: Yup.string().required("Nome obrigatório"),
      email: Yup.string().required("E-mail obrigatório"),
      tel: Yup.string().required("Telefone obrigatório"),
      cpf_cnpj: Yup.string().required("CPF obrigatório"),
      cep: Yup.string().required("CEP obrigatório"),
      address: Yup.string().required("Endereço obrigatório"),
      state: Yup.string().required("Estado obrigatório"),
      city: Yup.string().required("Cidade obrigatório"),
      password: Yup.string().required("Senha obrigatório"),
      account_type: Yup.number().required("Tipo de conta obrigatório"),
    });

    await validation.validate(body, {
      abortEarly: false,
    });

    try {
      const created = await usersService.create(body);

      return response.status(200).json({
        message: created,
      });
    } catch (error) {
      throw new ErrorMessage(error);
    }
  }

  async login(request: Request, response: Response) {
    const body = request.body;

    const validation = Yup.object().shape({
      email: Yup.string().required("E-mail obrigatório"),
      password: Yup.string().required("Senha obrigatório"),
    });

    await validation.validate(body, {
      abortEarly: false,
    });

    try {
      const tokenResponse = await loginUsersService.login(body);

      response.json({
        token: tokenResponse.jwt,
        uid: tokenResponse.id
      });
    } catch (error) {
      throw new ErrorMessage(error.message);
    }
  }

  async logout(request: Request, response: Response) {
    try {
      const data = await loginUsersService.logout(request.body);

      response.json({ auth: data.auth, token: data.token });
    } catch (error) {
      throw new ErrorMessage(error);
    }
  }

  async verifyTokenOnFrontEnd(request: Request, response: Response) {
    try {
      await verifyTokenService.verifyTokenOnFrontEnd(request);
      response.json({ message: 'Autenticado' });
    } catch (error) {
      throw new ErrorMessage(error);
    }
  }
}
