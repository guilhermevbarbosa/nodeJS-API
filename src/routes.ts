import { Router } from "express";

import UsersController from "./controllers/UsersController";

const routes = Router();
const usersController = new UsersController();

routes.post("/user", usersController.create);
routes.post("/login", usersController.login);
routes.post("/logout", usersController.logout);

export default routes;
