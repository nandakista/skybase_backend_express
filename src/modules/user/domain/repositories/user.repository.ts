import { User } from "../entities/user";

export interface UserRepository {
    getAllUsers(
        page: number, 
        limit: number, 
        search?: string,
    ): Promise<{data: User[], total: number}>;

    getUserById(id: number): Promise<User | null>;
}
