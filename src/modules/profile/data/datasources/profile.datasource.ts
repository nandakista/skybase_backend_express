import { User } from "../../domain/entities/user";

export interface ProfileDataSource {
  findById(id: number): Promise<User | null>;
}