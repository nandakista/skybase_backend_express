import { NextFunction, Request, Response } from "express";
import { ResponseHelper } from "../../../../infrastructure/http/response/response.helper";
import type { GetRolePermissionService } from "../../application/services/get-role-permission.service";

export class RbacController {
  constructor(private readonly getRolePermissionService: GetRolePermissionService) {}

  getRolePermissions = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roleId = Number(req.params.id);
      const result = await this.getRolePermissionService.execute(roleId);
      return ResponseHelper.success(res, result, "Role permissions retrieved successfully");
    } catch (error) {
      next(error);
    }
  };
}
