import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { env } from "../../../config/env";
import { UnauthorizedError } from "../../../shared/errors/app.error";
import { JwtPayload } from "../types/jwt-payload";

export function authorize(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      throw new UnauthorizedError(
        "UNAUTHORIZED",
        "Authorization header is required"
      );
    }

    const [scheme, token] = authorization.split(" ");

    if (scheme !== "Bearer" || !token) {
      throw new UnauthorizedError(
        "INVALID_TOKEN",
        "Invalid authorization header"
      );
    }

    const payload = jwt.verify(
      token,
      env.security.jwtSecret
    ) as JwtPayload;

    req.user = {
      id: payload.userId,
      email: payload.email,
      roleId: payload.roleId,
    };

    next();
  } catch (error) {
    next(
      error instanceof UnauthorizedError
        ? error
        : new UnauthorizedError(
            "INVALID_TOKEN",
            "Invalid or expired token"
          )
    );
  }
}