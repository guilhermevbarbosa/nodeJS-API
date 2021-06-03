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

    async update(id: string, jobData: any) {
        return this.jobsRepository.update(id, jobData);
    }
}