import { PaginationResponseDto } from "../../../../shared/dto/pagination-response.dto";
import type { UserRepository } from "../../domain/repositories/user.repository";
import { UserResponseDto } from "../dto/user.response.dto";

export class GetUsersService {
  constructor(private readonly userRepository: UserRepository) { }

  async execute(
    page: number,
    limit: number,
    search?: string,
  ): Promise<PaginationResponseDto<UserResponseDto>> {

    const { data, total } =
      await this.userRepository.getAllUsers(
        page,
        limit,
        search,
      );

    return PaginationResponseDto.from(
      data.map((user) => UserResponseDto.from(user)),
      page,
      limit,
      total,
    );
  }
}
