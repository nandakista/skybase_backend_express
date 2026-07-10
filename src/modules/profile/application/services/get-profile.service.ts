import { NotFoundError } from "../../../../shared/errors/app.error";
import { ProfileRepository } from "../../domain/repositories/profile.repository";
import { ProfileResponseDto } from "../dto/profile.response.dto";

export class GetProfileService {
  constructor(
    private readonly profileRepository: ProfileRepository
  ) {}

  async execute(userId: number): Promise<ProfileResponseDto> {
    const user = await this.profileRepository.getProfile(userId);

    if (!user) {
        throw new NotFoundError(
            "USER_NOT_FOUND",
            "User not found"
        );
    }

    return ProfileResponseDto.from(user);
  }
}