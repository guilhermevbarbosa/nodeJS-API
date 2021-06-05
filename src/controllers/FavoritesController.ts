import { Request, Response } from "express";
import * as Yup from "yup";
import { container } from "tsyringe";

import ErrorMessage from "../shared/errors/errorMessage";

import FavoritesService from "../services/Favorites/FavoritesService";

export default class FavoritesController {
    async create(request: Request, response: Response) {
        const favoriteService = container.resolve(FavoritesService);
        const body = request.body;

        console.log(body)

        const validation = Yup.object().shape({
            user_id: Yup.string().required("user_id obrigatório"),
            job_id: Yup.string().required("job_id obrigatório"),
        });

        await validation.validate(body, {
            abortEarly: false
        });

        try {
            const favorited = await favoriteService.create(body);

            return response.status(200).json({
                message: favorited
            });
        } catch (error) {
            throw new ErrorMessage(error);
        }
    }
}