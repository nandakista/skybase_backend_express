import { User } from "../entities/user";

export interface ProfileRepository {
  getProfile(id: number): Promise<User | null>;
}