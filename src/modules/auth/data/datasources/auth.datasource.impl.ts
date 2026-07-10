import { db } from "../../../../config/database";

import { User } from "../../domain/entities/user";
import { AuthDataSource } from "./auth.datasource";

export class AuthDataSourceImpl implements AuthDataSource {
  async findById(id: number): Promise<User | null> {
    const user = await db("users")
      .where({
        id,
        deleted_at: null,
      })
      .first();

    if (!user) {
      return null;
    }

    // return UserMapper.toEntity(user);
    return {
      id: Number(user.id),
      name: user.name,
      email: user.email,
      password: user.password,
      isActive: user.is_active,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
      deletedAt: user.deleted_at,
      roleId: Number(user.role_id),
    };
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await db("users")
      .where({
        email,
        deleted_at: null,
      })
      .first();

    if (!user) {
      return null;
    }

    // return UserMapper.toEntity(user);
    return {
      id: Number(user.id),
      name: user.name,
      email: user.email,
      password: user.password,
      isActive: user.is_active,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
      deletedAt: user.deleted_at,
      roleId: Number(user.role_id),
    };
  }
}