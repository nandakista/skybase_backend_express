import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";

import { ValidationError } from "../../../shared/errors/app.error";

export function validate(schema: ZodType) {
  return (
    req: Request,
    _res: Response,
    next: NextFunction
  ) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      throw new ValidationError(
        "VALIDATION_ERROR",
        result.error.issues[0].message
      );
    }

    req.body = result.data;

    next();
  };
}