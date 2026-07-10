import { NextFunction, Request, Response } from "express";
import { LoginService } from "../../application/services/login.service";
import { ResponseHelper } from "../../../../infrastructure/http/response/response.helper";

export class LoginController {
  constructor(private loginUseCase: LoginService) {}

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const result = await this.loginUseCase.execute(email, password);
      return ResponseHelper.success(
        res,
        result,
        "Login success"
      );
    } catch (error: any) {
      next(error);
    }
  };
}