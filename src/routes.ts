import { Router } from "express";

import VerifyJWTTokenService from "./services/utils/verifyJWTTokenService";

import JobsController from "./controllers/JobsController";
import UsersController from "./controllers/UsersController";
import FavoritesController from "./controllers/FavoritesController";

const routes = Router();
const jwt = new VerifyJWTTokenService();

const usersController = new UsersController();
const jobsController = new JobsController();
const favoritesController = new FavoritesController();

routes.post("/user", usersController.create);
routes.post("/login", usersController.login);
routes.post("/logout", usersController.logout);
routes.post("/profile", usersController.profile);
routes.post("/profile-edit", usersController.update);

routes.post('/token', usersController.verifyTokenOnFrontEnd);

routes.post("/service", jwt.verify, jobsController.create);
routes.get("/service", jwt.verify, jobsController.getAll);
routes.post("/service/category/", jobsController.getJobsInCategory);

routes.post("/serviceId", jwt.verify, jobsController.getOne);

routes.post("/service/profile", jwt.verify, jobsController.getProfileJobs);
routes.put("/service/update", jwt.verify, jobsController.update);
routes.post("/service/delete", jwt.verify, jobsController.delete);

routes.post("/service/favorite", jwt.verify, favoritesController.create);
routes.post("/service/favorite-count", jwt.verify, favoritesController.verifyIfServiceHasFavorited);
routes.post("/service/favorite-delete", jwt.verify, favoritesController.delete);

export default routes;
