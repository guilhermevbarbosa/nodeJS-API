import CardJobs from "../../models/dto/jobs/CardJobs";
import Job from "../../models/Job";

export default interface IJobsRepository {
    create(jobData: any): Promise<string>;
    getAll(): Promise<Array<Job>>;
    getOne(jobId: string): Promise<CardJobs>;
    getJobsInCategory(jobCategory: string): Promise<Array<Job>>;
    getProfileJobs(userId: string): Promise<Array<Job>>;
    update(id: string, jobData: any): Promise<any>;
    delete(id: string): Promise<string>;
}