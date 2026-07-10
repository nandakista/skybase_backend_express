import { NextFunction, Request, Response } from "express";
import { ResponseHelper } from "../../../../infrastructure/http/response/response.helper";
import { GetUserDetailUseCase } from "../../application/services/get-detail-user.service";

export class UserController {
  constructor(private readonly getUserDetailService: GetUserDetailUseCase) { }

  user = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = Number(req.params.id);
      const result = await this.getUserDetailService.execute(id);
      return ResponseHelper.success(
        res,
        result,
        "User detail retrieved successfully"
      );
    } catch (error) {
      next(error);
    }
  };
}
