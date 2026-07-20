import { NextFunction, Request, Response } from "express";
import { ResponseHelper } from "../../../../infrastructure/http/response/response.helper";
import { permissionService } from "../../../../core/rbac/container";

export class PermissionsController {
  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roleId = req.user?.roleId;

      if (!roleId) {
        return ResponseHelper.success(res, { role_id: null, permissions: {} }, "Permissions retrieved successfully");
      }

      const permissionNames = await permissionService.getPermissionsByRoleId(roleId);

      const permissionsByModule: Record<string, Record<string, boolean>> = {};

      for (const permissionName of permissionNames) {
        const [module, action] = permissionName.split(".");

        if (!module || !action) {
          continue;
        }

        if (!permissionsByModule[module]) {
          permissionsByModule[module] = {
            read: false,
            create: false,
            update: false,
            delete: false,
          };
        }

        if (action in permissionsByModule[module]) {
          permissionsByModule[module][action] = true;
        }
      }

      const responseData = {
        role_id: roleId,
        permissions: permissionsByModule,
      };

      return ResponseHelper.success(res, responseData, "Permissions retrieved successfully");
    } catch (error) {
      next(error);
    }
  };
}
