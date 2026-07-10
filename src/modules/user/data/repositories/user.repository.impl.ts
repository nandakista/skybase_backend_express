import type { UserDataSource } from "../datasources/user.datasource";
import type { UserRepository } from "../../domain/repositories/user.repository";
import { User } from "../../domain/entities/user";
import { UserMapper } from "../mappers/user.mapper";

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly datasource: UserDataSource) { }

  async getAllUsers(
    page: number,
    limit: number,
    search?: string,
  ): Promise<{
    data: User[];
    total: number;
  }> {
    const result = await this.datasource.getAllUsers(
      page,
      limit,
      search,
    );

    return {
      data: result.data.map((e) => UserMapper.toEntity(e)),
      total: result.total,
    };
  }

  getUserById(id: number): Promise<User | null> {
    return this.datasource.getUserById(id);
  }
}
