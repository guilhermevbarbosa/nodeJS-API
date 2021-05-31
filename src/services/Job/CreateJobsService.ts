import { inject, injectable } from "tsyringe";
import IJobsRepository from "../../modules/jobs/IJobsRepository";

@injectable()
export default class CreateJobsService {
    constructor(
        @inject("JobsRepository")
        private jobsRepository: IJobsRepository
    ) { }

    async create(jobRequest: any) {
        return this.jobsRepository.create(jobRequest);
    }
}