import { Request, Response, NextFunction } from "express";
import { AppError } from "../../../shared/errors/app.error";
import { ResponseHelper } from "../response/response.helper";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("ERROR HANDLER");
  
  if (err instanceof AppError) {
    return ResponseHelper.error(
      res,
      err.statusCode,
      err.message,
      err.error
    );
  }

  console.error(err);

  return ResponseHelper.error(
    res,
    500,
    "INTERNAL_SERVER_ERROR",
    "Internal Server Error",
  );
}