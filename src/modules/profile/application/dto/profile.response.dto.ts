import { User } from "../../../auth/domain/entities/user";

export class ProfileResponseDto {
  id: number;
  name: string;
  email: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  role_id: number;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.is_active = user.isActive;
    this.created_at = user.createdAt;
    this.updated_at = user.updatedAt;
    this.deleted_at = user.deletedAt;
    this.role_id = user.roleId;
  }

  static from(user: User): ProfileResponseDto {
    return new ProfileResponseDto(user);
  }
}