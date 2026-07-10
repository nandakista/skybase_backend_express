import { NextFunction, Request, Response } from "express";

import { ForbiddenError, UnauthorizedError } from "../../../shared/errors/app.error";

export enum Role {
  SUPER_ADMIN = 1,
  ADMIN = 2,
  MAINTAINER = 3,
  USER = 4,
  GUEST = 5,
}

export function permission(...allowedRoles: number[]) {
    return (
        req: Request,
        _res: Response,
        next: NextFunction
    ): void => {
        if (!req.user) {
            return next(
                new UnauthorizedError(
                    "UNAUTHORIZED",
                    "User is not authenticated"
                )
            );
        }

        if (!allowedRoles.includes(req.user.roleId)) {
            return next(
                new ForbiddenError(
                    "FORBIDDEN",
                    "You don't have permission to access this resource"
                )
            );
        }

        next();
    };
}