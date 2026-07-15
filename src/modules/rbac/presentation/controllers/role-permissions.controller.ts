import { NextFunction, Request, Response } from "express";
import { ResponseHelper } from "../../../../infrastructure/http/response/response.helper";
import type { GetRolePermissionsService } from "../../application/services/get-role-permissions.service";

export class RolePermissionsController {
  constructor(private readonly getRolePermissionsService: GetRolePermissionsService) {}

  detail = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roleId = Number(req.params.roleId);
      const result = await this.getRolePermissionsService.execute(roleId);
      return ResponseHelper.success(res, result, "Role permissions retrieved successfully");
    } catch (error) {
      next(error);
    }
  };
}
