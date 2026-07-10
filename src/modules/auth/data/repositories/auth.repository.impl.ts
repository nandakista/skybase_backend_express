import { AuthRepository } from "../../domain/repositories/auth.repository";
import { User } from "../../domain/entities/user";
import { AuthDataSource } from "../datasources/auth.datasource";

export class AuthRepositoryImpl implements AuthRepository {
  constructor(
    private readonly dataSource: AuthDataSource
  ) {}

  async findById(id: number): Promise<User | null> {
    return this.dataSource.findById(id);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.dataSource.findByEmail(email);
  }
}