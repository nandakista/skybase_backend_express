import { NotFoundError } from "../../../../shared/errors/app.error";
import { UserRepository } from "../../domain/repositories/user.repository";
import { UserResponseDto } from "../dto/user.response.dto";

export class GetUserDetailUseCase {
  constructor(private readonly userRepository: UserRepository) {}
  
  async execute(id: number): Promise<UserResponseDto | null> {
    const user = await this.userRepository.getUserById(id);
    
    if (!user) {
      throw new NotFoundError(
        "USER_NOT_FOUND",
        "User not found"
      );
    }

    return !user ? null : UserResponseDto.from(user);
  }
}