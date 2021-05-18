import Job from "../../models/Job";

export default interface IJobsRepository {
    create(jobData: any): Promise<string>;
    getAll(): Promise<Array<Job>>
    getOne(jobId: string): Promise<Job>
}