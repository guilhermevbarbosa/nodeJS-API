import { getRepository, Repository } from "typeorm";
import CardJobs from "../../../models/dto/jobs/CardJobs";

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

    public async getOne(id: string): Promise<CardJobs> {
        const jobSearch = await this.ormRepository.findOne({
            where: { id },
            relations: ['user_id']
        });

        if (!jobSearch) {
            throw new ErrorMessage("Não foi possível localizar o serviço");
        } else {
            return {
                id: String(jobSearch.id),
                name: jobSearch.name,
                description: jobSearch.description,
                category: jobSearch.category,
                aprox_val: jobSearch.aprox_val,
                email: jobSearch.user_id.email,
                tel: jobSearch.user_id.tel,
                address: jobSearch.user_id.address,
                state: jobSearch.user_id.state,
                city: jobSearch.user_id.city,
                userName: jobSearch.user_id.name
            };
        }
    }

    public async getJobsInCategory(category: string): Promise<Array<Job>> {
        const job = await this.ormRepository.find({
            where: { category: category }
        });

        if (!job) {
            throw new ErrorMessage("Não foi possível localizar o serviço");
        }

        return job;
    }

    public async getProfileJobs(userId: string): Promise<Array<Job>> {
        const jobs = await this.ormRepository.find({
            where: { user_id: userId }
        });

        if (jobs.length == 0) {
            throw new ErrorMessage("Não possui serviços ainda");
        }

        return jobs;
    }

    public async update(id: string, jobData: any): Promise<any> {
        try {
            await this.ormRepository.update(id, jobData);

            return {
                status: 200,
                message: 'Atualizado com sucesso'
            }
        } catch (error) {
            return error;
        }
    }

    public async delete(id: string): Promise<string> {
        try {
            await this.ormRepository.delete(id);
            return 'Deletado com sucesso';
        } catch (error) {
            return error;
        }
    }
}

export default JobsRepository;