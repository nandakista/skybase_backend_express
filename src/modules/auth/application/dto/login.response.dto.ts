import { User } from "../../domain/entities/user";

export class LoginResponseDto {
  token: string;
  
  user: {
    id: number;
    name: string;
    email: string;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
    role_id: number;
  };

  constructor(token: string, user: User) {
    this.token = token;

    this.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      is_active: user.isActive,
      created_at: user.createdAt,
      updated_at: user.updatedAt,
      deleted_at: user.deletedAt,
      role_id: user.roleId,
    };
  }

  static from(token: string, user: User): LoginResponseDto {
    return new LoginResponseDto(token, user);
  }
}