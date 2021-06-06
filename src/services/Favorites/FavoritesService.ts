import { inject, injectable } from "tsyringe";
import IFavoritesRepository from "../../modules/favorites/IFavoritesRepository";

@injectable()
export default class FavoritesService {
    constructor(
        @inject("FavoritesRepository")
        private favoritesRepository: IFavoritesRepository
    ) { }

    async create(dataRequest: any) {
        return this.favoritesRepository.create(dataRequest);
    }

    async verifyIfHasFavorited(jobId: string, userId: string) {
        return this.favoritesRepository.verifyIfHasFavorited(jobId, userId);
    }

    async delete(jobId: string, userId: string) {
        return this.favoritesRepository.delete(jobId, userId);
    }

    async getAll(uid: string) {
        return this.favoritesRepository.getAll(uid);
    }
}