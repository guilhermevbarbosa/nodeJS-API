import { Router } from "express";

import UsersController from "./controllers/UsersController";

const routes = Router();

const usersController = new UsersController();

routes.get("/user", usersController.create);

export default routes;
