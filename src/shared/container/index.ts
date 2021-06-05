import { container } from "tsyringe";

import IUsersRepository from "../../modules/users/IUsersRepository";
import UsersRepository from "../../modules/users/infra/UsersRepository";

import IJobsRepository from "../../modules/jobs/IJobsRepository";
import JobsRepository from "../../modules/jobs/infra/JobsRepository";

import IFavoritesRepository from "../../modules/favorites/IFavoritesRepository";
import FavoritesRepository from "../../modules/favorites/infra/FavoritesRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IJobsRepository>(
  "JobsRepository",
  JobsRepository
);

container.registerSingleton<IFavoritesRepository>(
  "FavoritesRepository",
  FavoritesRepository
);
