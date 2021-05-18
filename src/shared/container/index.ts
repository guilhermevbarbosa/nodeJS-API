import { container } from "tsyringe";

import IUsersRepository from "../../modules/users/IUsersRepository";
import UsersRepository from "../../modules/users/infra/UsersRepository";

import IJobsRepository from "../../modules/jobs/IJobsRepository";
import JobsRepository from "../../modules/jobs/infra/JobsRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IJobsRepository>(
  "JobsRepository",
  JobsRepository
);
