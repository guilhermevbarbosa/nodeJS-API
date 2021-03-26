import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import ErrorMessage from "../../errors/errorMessage";

export default class VerifyJWTTokenService {
  verify(request: Request, response: Response, next: NextFunction) {
    const token = String(request.headers.authorization).split(" ")[1];
    const secret = String(process.env.SECRET);

    if (!token) {
      throw new ErrorMessage("Não há token fornecido", 401);
    }

    jwt.verify(token, secret, function (err, decoded) {
      if (err) {
        throw new ErrorMessage("Falha na assinatura do token", 500);
      }

      const decodedData = decoded as any;
      (request as any).userId = decodedData.loggedId;

      next();
    });
  }
}
