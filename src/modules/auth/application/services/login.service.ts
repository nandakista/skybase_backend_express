import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthRepository } from "../../domain/repositories/auth.repository";
import { env } from "../../../../config/env";
import { BadRequestError } from "../../../../shared/errors/app.error";
import { LoginResponseDto } from "../dto/login.response.dto";

export class LoginService {
  constructor(private authRepo: AuthRepository) {}

  async execute(email: string, password: string) {
    const user = await this.authRepo.findByEmail(email);

    if (!user) {
      throw new BadRequestError(
        "INVALID_CREDENTIALS",
        "Email or password is incorrect"
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new BadRequestError(
        "INVALID_CREDENTIALS",
        "Email or password is incorrect"
      );
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        roleId: user.roleId,
      },
      env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return LoginResponseDto.from(token, user);
  }
}