import { getRepository, Repository } from "typeorm";
import Favorite from "../../../models/Favorite";
import ErrorMessage from "../../../shared/errors/errorMessage";
import IFavoritesRepository from "../IFavoritesRepository";

class FavoritesRepository implements IFavoritesRepository {
    private ormRepository: Repository<Favorite>;

    constructor() {
        this.ormRepository = getRepository(Favorite);
    }

    public async create(dataRequest: any): Promise<any> {
        const favorite = this.ormRepository.create(dataRequest);
        const savedFavorite = await this.ormRepository.save(favorite);

        if (!savedFavorite) {
            throw new ErrorMessage("Não foi possível favoritar o serviço selecionado");
        }

        return "Serviço favoritado com sucesso!";
    }
}

export default FavoritesRepository;