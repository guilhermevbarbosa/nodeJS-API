import { Request, Response } from "express";
import * as Yup from "yup";

import ErrorMessage from "../errors/errorMessage";
import UsersService from "../services/User/UsersService";

export default class UsersController {
  async create(request: Request, response: Response) {
    const usersService = new UsersService();
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
      await usersService.create(body, response);
    } catch (error) {
      throw new ErrorMessage(error);
    }
  }
}
