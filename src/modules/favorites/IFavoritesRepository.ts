export default interface IFavoritesRepository {
    create(dataRequest: any): Promise<any>;
    delete(jobId: string, userId: string): Promise<any>;
    verifyIfHasFavorited(jobId: string, userId: string): Promise<any>;
    getAll(uid: string): Promise<any>;
}