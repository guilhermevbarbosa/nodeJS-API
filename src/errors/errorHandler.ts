import { ErrorRequestHandler } from "express";
import { ValidationError } from "yup";

import ErrorMessage from "./errorMessage";
interface ValidationErrors {
  [key: string]: string[];
}

const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
  // Se erro de validação
  if (error instanceof ValidationError) {
    let errors: ValidationErrors = {};

    error.inner.forEach((err) => {
      errors[err.path!] = err.errors;
    });

    return response.status(400).json({
      message: "Erro de validação",
      errors,
    });
  }

  // Erro de error message
  if (error instanceof ErrorMessage) {
    return response.status(error.statusCode).json({ error: error.message });
  }

  console.error(error);
  // Erro no servidor
  return response.status(580).json({
    message: "Internal server error",
  });
};

export default errorHandler;
