import { Router } from "express";

import VerifyJWTTokenService from "./services/utils/verifyJWTTokenService";

import JobsController from "./controllers/JobsController";
import UsersController from "./controllers/UsersController";

const routes = Router();
const jwt = new VerifyJWTTokenService();

const usersController = new UsersController();
const jobsController = new JobsController();

routes.post("/user", usersController.create);
routes.post("/login", usersController.login);
routes.post("/logout", usersController.logout);

routes.post("/service", jwt.verify, jobsController.create);
routes.get("/service", jobsController.getAll);
routes.get("/service/:jobId", jobsController.getOne);

export default routes;
