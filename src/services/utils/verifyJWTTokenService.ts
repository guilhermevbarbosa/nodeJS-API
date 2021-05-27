import { NextFunction, Request, Response } from "express";

import ErrorMessage from "../../shared/errors/errorMessage";

import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";

export default class VerifyJWTTokenService {
  verify(request: Request, response: Response, next: NextFunction) {
    const token = String(request.headers.authorization).split(" ")[1];

    const publicKey = fs.readFileSync(
      path.join(__dirname, "..", "..", "..", "public.key"),
      "utf-8"
    );

    if (!token) {
      throw new ErrorMessage("Não há token fornecido", 401);
    }

    jwt.verify(token, publicKey, function (err, decoded) {
      if (err) {
        throw new ErrorMessage("Token inválido", 500);
      }

      next();
    });
  }

  async verifyTokenOnFrontEnd(request: Request) {
    const token = String(request.headers.authorization).split(" ")[1];

    const publicKey = fs.readFileSync(
      path.join(__dirname, "..", "..", "..", "public.key"),
      "utf-8"
    );

    if (!token) {
      throw new ErrorMessage("Não há token fornecido", 401);
    }

    jwt.verify(token, publicKey, function (err, decoded) {
      if (err) {
        throw new ErrorMessage("Token inválido", 500);
      }
    });
  }
}
