import { User } from "../../domain/entities/user";
import { RoleMapper } from "./role.mapper";

export class UserMapper {
  static toEntity(row: any): User {
    return {
      id: Number(row.id),
      name: row.name,
      email: row.email,
      password: row.password,
      isActive: row.is_active,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      deletedAt: row.deleted_at,
      roleId: Number(row.role_id),
      role: row.role__id
        ? RoleMapper.toEntity(row)
        : undefined,
    };
  }

  static toPersistence(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      is_active: user.isActive,
      created_at: user.createdAt,
      updated_at: user.updatedAt,
      deleted_at: user.deletedAt,
      role_id: user.roleId,
    };
  }
}