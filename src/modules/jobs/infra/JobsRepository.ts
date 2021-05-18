import { getRepository, Repository } from "typeorm";

import Job from "../../../models/Job";
import ErrorMessage from "../../../shared/errors/errorMessage";
import IJobsRepository from "../IJobsRepository";

class JobsRepository implements IJobsRepository {
    private ormRepository: Repository<Job>;

    constructor() {
        this.ormRepository = getRepository(Job);
    }

    public async create(jobData: any): Promise<string> {
        const job = await this.ormRepository.create(jobData);
        const savedJob = await this.ormRepository.save(job);

        if (!savedJob) {
            throw new ErrorMessage("Não foi possível criar o serviço");
        }

        return "Serviço criado com sucesso!";
    }

    public async getAll(): Promise<Array<Job>> {
        const jobs = await this.ormRepository.find();

        if (!jobs) {
            throw new ErrorMessage("Não foi possível buscar os serviços");
        }

        return jobs;
    }

    public async getOne(id: string): Promise<Job> {
        const job = await this.ormRepository.findOne({
            where: { id }
        });

        if (!job) {
            throw new ErrorMessage("Não foi possível localizar o serviço");
        }

        return job;
    }
}

export default JobsRepository;