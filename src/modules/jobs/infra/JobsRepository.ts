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
        const job = this.ormRepository.create(jobData);
        const savedJob = await this.ormRepository.save(job);

        if (!savedJob) {
            throw new ErrorMessage("Não foi possível criar o serviço");
        }

        return "Serviço criado com sucesso!";
    }
}

export default JobsRepository;