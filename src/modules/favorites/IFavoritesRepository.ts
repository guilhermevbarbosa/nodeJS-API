export default interface IFavoritesRepository {
    create(dataRequest: any): Promise<any>;
}