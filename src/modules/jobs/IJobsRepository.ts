export default interface IJobsRepository {
    create(jobData: any): Promise<string>;
}