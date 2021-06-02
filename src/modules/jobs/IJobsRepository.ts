import Job from "../../models/Job";

export default interface IJobsRepository {
    create(jobData: any): Promise<string>;
    getAll(): Promise<Array<Job>>;
    getOne(jobId: string): Promise<Job>;
    getJobsInCategory(jobCategory: string): Promise<Array<Job>>;
    getProfileJobs(userId: string): Promise<Array<Job>>;
}