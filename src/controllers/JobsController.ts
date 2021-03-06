import { Request, Response } from "express";
import * as Yup from "yup";
import { container } from "tsyringe";

import ModJobsService from "../services/Job/ModJobsService";
import ErrorMessage from "../shared/errors/errorMessage";
import GetJobsService from "../services/Job/GetJobsService";

export default class JobsController {
    async create(request: Request, response: Response) {

        const jobsService = container.resolve(ModJobsService);
        const body = request.body;

        const validation = Yup.object().shape({
            user_id: Yup.string().required("user_id obrigatório"),
            name: Yup.string().required("Nome obrigatório"),
            description: Yup.string().required("Descrição obrigatório"),
            category: Yup.string().required("Categoria obrigatório"),
            aprox_val: Yup.string().required("Valor aproximado obrigatório"),
        });

        await validation.validate(body, {
            abortEarly: false
        });

        try {
            const created = await jobsService.create(body);

            return response.status(200).json({
                message: created
            });
        } catch (error) {
            throw new ErrorMessage(error);
        }
    }

    async getAll(request: Request, response: Response) {
        const jobsService = container.resolve(GetJobsService);

        try {
            const jobs = await jobsService.getAll();

            return response.status(200).json(jobs);
        } catch (error) {
            throw new ErrorMessage(error);
        }
    }

    async getOne(request: Request, response: Response) {
        const jobsService = container.resolve(GetJobsService);
        const id = request.body.id;

        try {
            const job = await jobsService.getOne(id);

            return response.status(200).json(job);
        } catch (error) {
            throw new ErrorMessage(error);
        }
    }

    async getJobsInCategory(request: Request, response: Response) {
        const jobsService = container.resolve(GetJobsService);
        const category = request.body.categoria;

        try {
            const job = await jobsService.getJobsInCategory(category);

            return response.status(200).json(job);
        } catch (error) {
            throw new ErrorMessage(error);
        }
    }

    async getProfileJobs(request: Request, response: Response) {
        const jobsService = container.resolve(GetJobsService);
        const userId = request.body.userId;

        try {
            const jobs = await jobsService.getJobsInProfile(userId);
            return response.status(200).json(jobs);
        } catch (error) {
            throw new ErrorMessage(error);
        }
    }

    async update(request: Request, response: Response) {
        const jobsService = container.resolve(ModJobsService);

        const body = request.body;
        const id = body.id;
        delete body.id;

        try {
            const data = await jobsService.update(id, body);
            return response.status(200).json(data);
        } catch (error) {
            throw new ErrorMessage(error);
        }
    }

    async delete(request: Request, response: Response) {
        const jobsService = container.resolve(ModJobsService);

        const body = request.body;
        const id = body.id;

        try {
            const data = await jobsService.delete(id);
            return response.status(200).json(data);
        } catch (error) {
            throw new ErrorMessage(error);
        }
    }
}