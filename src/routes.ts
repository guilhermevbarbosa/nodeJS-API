import { Router } from "express";

import UsersController from "./controllers/UsersController";
import VerifyJWTTokenService from "./services/utils/verifyJWTTokenService";

const routes = Router();
const usersController = new UsersController();
const jwt = new VerifyJWTTokenService();

routes.post("/user", usersController.create);
routes.post("/login", usersController.login);
routes.post("/logout", usersController.logout);

export default routes;
