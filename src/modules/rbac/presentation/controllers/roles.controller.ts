import { NextFunction, Request, Response } from "express";
import { ResponseHelper } from "../../../../infrastructure/http/response/response.helper";
import type { GetRolesService } from "../../application/services/get-roles.service";

export class RolesController {
  constructor(private readonly getRolesService: GetRolesService) {}

  list = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.getRolesService.execute();
      return ResponseHelper.success(res, result, "Roles retrieved successfully");
    } catch (error) {
      next(error);
    }
  };
}
