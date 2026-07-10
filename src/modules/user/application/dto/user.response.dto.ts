import { User } from "../../domain/entities/user";
import { RoleResponseDto } from "./role.response.dto";

export class UserResponseDto {
  id: number;
  name: string;
  email: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  role_id: number;
  role: RoleResponseDto | null;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.is_active = user.isActive;
    this.created_at = user.createdAt;
    this.updated_at = user.updatedAt;
    this.deleted_at = user.deletedAt;
    this.role_id = user.roleId;
    this.role = user.role
      ? RoleResponseDto.from(user.role)
      : null;
  }

  static from(user: User): UserResponseDto {
    return new UserResponseDto(user);
  }
}