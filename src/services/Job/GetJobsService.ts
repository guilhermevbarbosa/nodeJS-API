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

    async getJobsInCategory(jobCategory: string) {
        return this.jobsRepository.getJobsInCategory(jobCategory);
    }

    async getJobsInProfile(userId: string) {
        return this.jobsRepository.getProfileJobs(userId);
    }
}