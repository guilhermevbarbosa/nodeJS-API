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

    public async verifyIfHasFavorited(jobId: string, userId: string): Promise<any> {
        const count = await this.ormRepository.findOne({
            where: { job_id: jobId, user_id: userId }
        });

        if (count) {
            return 1;
        } else {
            return 0;
        }
    }

    public async delete(jobId: string, userId: string): Promise<any> {
        try {
            const favoriteToDelete = await this.ormRepository.findOne({
                where: { job_id: jobId, user_id: userId }
            })

            if (favoriteToDelete) {
                const id = String(favoriteToDelete.id);
                await this.ormRepository.delete(id);
                return 'Desfavoritado com sucesso';
            }
        } catch (error) {
            return error;
        }
    }

    public async getAll(uid: string): Promise<any> {
        try {
            const favoriteToDelete = await this.ormRepository.find({
                where: { user_id: uid },
                relations: ['job_id']
            })

            if (favoriteToDelete.length > 0) {
                return favoriteToDelete;
            } else {
                throw new ErrorMessage("Não há favoritos no momento");
            }
        } catch (error) {
            return error;
        }
    }
}

export default FavoritesRepository;