import { inject, injectable } from "tsyringe";
import IJobsRepository from "../../modules/jobs/IJobsRepository";

@injectable()
export default class GetJobsService {
    constructor(
        @inject("JobsRepository")
        private jobsRepository: IJobsRepository
    ) { }

    async getAll() {
        return this.jobsRepository.getAll();
    }

    async getOne(jobId: string) {
        return this.jobsRepository.getOne(jobId);
    }
}