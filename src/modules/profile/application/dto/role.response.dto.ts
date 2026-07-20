import { Role } from "../../domain/entities/role";

export class RoleResponseDto {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;

  constructor(role: Role) {
    this.id = role.id;
    this.name = role.name;
    this.created_at = role.createdAt;
    this.updated_at = role.updatedAt;
    this.deleted_at = role.deletedAt;
  }

  static from(role: Role): RoleResponseDto {
    return new RoleResponseDto(role);
  }
}