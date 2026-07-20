import { db } from "../../../../config/database";

import { User } from "../../domain/entities/user";
import { ProfileDataSource } from "./profile.datasource";

export class ProfileDataSourceImpl implements ProfileDataSource {
  async findById(id: number): Promise<User | null> {
    const user = await db("users")
      .leftJoin("roles", "roles.id", "users.role_id")
      .select(
        "users.*",
        "roles.id as role__id",
        "roles.name as role__name",
        "roles.created_at as role__created_at",
        "roles.updated_at as role__updated_at",
        "roles.deleted_at as role__deleted_at"
      )
      .where("users.id", id)
      .andWhere("users.deleted_at", null)
      .first();

    if (!user) {
      return null;
    }

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
      role: user.role__id
        ? {
          id: Number(user.role__id),
          name: user.role__name,
          createdAt: user.role__created_at,
          updatedAt: user.role__updated_at,
          deletedAt: user.role__deleted_at,
        }
        : undefined,
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