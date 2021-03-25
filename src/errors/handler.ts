import { ErrorRequestHandler } from "express";
import { ValidationError } from "yup";

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
      message: "Validation fails",
      errors,
    });
  }

  console.error(error);

  // Erro no servidor
  return response.status(580).json({
    message: "Internal server error",
  });
};

export default errorHandler;
