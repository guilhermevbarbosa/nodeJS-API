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
}