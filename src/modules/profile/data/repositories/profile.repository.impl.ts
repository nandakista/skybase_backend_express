import { User } from "../../domain/entities/user";
import { ProfileRepository } from "../../domain/repositories/profile.repository";
import { ProfileDataSource } from "../datasources/profile.datasource";

export class ProfileRepositoryImpl implements ProfileRepository {
  constructor(
    private readonly dataSource: ProfileDataSource
  ) {}

  async getProfile(id: number): Promise<User | null> {
    return this.dataSource.findById(id);
  }
}