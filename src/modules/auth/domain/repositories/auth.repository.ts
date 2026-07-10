import { User } from "../entities/user";

export interface AuthRepository {
  findByEmail(email: string): Promise<User | null>;

  findById(id: number): Promise<User | null>;
}