import { User } from "../../domain/entities/user";

export interface UserDataSource {
    getAllUsers(
        page: number, 
        limit: number, 
        search?: string,
    ): Promise<{data: User[], total: number}>;

    getUserById(id: number): Promise<User | null>;
}
