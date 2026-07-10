import { User } from "../../domain/entities/user";

export interface AuthDataSource {
  findById(id: number): Promise<User | null>;

  findByEmail(email: string): Promise<User |null>;
}