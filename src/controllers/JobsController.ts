import { Request, Response } from "express";
import * as Yup from "yup";
import { container } from "tsyringe";

import CreateJobsService from "../services/Job/CreateJobService";
import ErrorMessage from "../shared/errors/errorMessage";

export default class JobsController {
    async create(request: Request, response: Response) {

        const jobsService = container.resolve(CreateJobsService);
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
}