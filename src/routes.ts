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
routes.post("/profile", usersController.profile);
routes.post("/profile-edit", usersController.update);

routes.post('/token', usersController.verifyTokenOnFrontEnd);

routes.post("/service", jwt.verify, jobsController.create);
routes.get("/service", jwt.verify, jobsController.getAll);
routes.get("/service/:jobId", jwt.verify, jobsController.getOne);
routes.get("/service/category/:jobCategory", jobsController.getJobsInCategory);

routes.post("/service/profile", jobsController.teste);

export default routes;
