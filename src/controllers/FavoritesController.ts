import { Request, Response } from "express";
import * as Yup from "yup";
import { container } from "tsyringe";

import ErrorMessage from "../shared/errors/errorMessage";

import FavoritesService from "../services/Favorites/FavoritesService";

export default class FavoritesController {
    async create(request: Request, response: Response) {
        const favoriteService = container.resolve(FavoritesService);
        const body = request.body;

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

    async verifyIfServiceHasFavorited(request: Request, response: Response) {
        const favoriteService = container.resolve(FavoritesService);
        const body = request.body;

        const job_id = body.job_id;
        const user_id = body.user_id;

        const validation = Yup.object().shape({
            user_id: Yup.string().required("user_id obrigatório"),
            job_id: Yup.string().required("job_id obrigatório"),
        });

        await validation.validate(body, {
            abortEarly: false
        });

        try {
            const favoritedCount = await favoriteService.verifyIfHasFavorited(job_id, user_id);

            return response.status(200).json({
                count: favoritedCount
            });
        } catch (error) {
            throw new ErrorMessage(error);
        }
    }

    async delete(request: Request, response: Response) {
        const favoriteService = container.resolve(FavoritesService);
        const body = request.body;

        const job_id = body.job_id;
        const user_id = body.user_id;

        const validation = Yup.object().shape({
            user_id: Yup.string().required("user_id obrigatório"),
            job_id: Yup.string().required("job_id obrigatório"),
        });

        await validation.validate(body, {
            abortEarly: false
        });

        try {
            const status = await favoriteService.delete(job_id, user_id);

            return response.status(200).json({
                message: status
            });
        } catch (error) {
            throw new ErrorMessage(error);
        }
    }

    async getAll(request: Request, response: Response) {
        const favoriteService = container.resolve(FavoritesService);
        const body = request.body;

        const user_id = body.user_id;

        const validation = Yup.object().shape({
            user_id: Yup.string().required("user_id obrigatório"),
        });

        await validation.validate(body, {
            abortEarly: false
        });

        try {
            const favorites = await favoriteService.getAll(user_id);

            return response.status(200).json(favorites);
        } catch (error) {
            throw new ErrorMessage(error);
        }
    }
}