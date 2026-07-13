import { NextFunction, Request, Response } from "express";

import { ForbiddenError, UnauthorizedError } from "../../../shared/errors/app.error";
import { permissionService } from "../../../core/rbac/container";

export function permission(permissionName: string) {
  return async (
    req: Request,
    _res: Response,
    next: NextFunction
  ): Promise<void> => {
    if (!req.user) {
      return next(
        new UnauthorizedError(
          "UNAUTHORIZED",
          "User is not authenticated"
        )
      );
    }

    const hasPermission = await permissionService.hasPermission(
      req.user.roleId,
      permissionName
    );

    if (!hasPermission) {
      return next(
        new ForbiddenError(
          "FORBIDDEN",
          `You don't have permission to access this resource. You need permission '${permissionName}'`
        )
      );
    }

    next();
  };
}
