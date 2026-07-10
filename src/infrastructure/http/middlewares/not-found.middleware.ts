import { NextFunction, Request, Response } from "express";
import { ResponseHelper } from "../response/response.helper";

export function notFoundHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  return ResponseHelper.error(
    res,
    404,
    "ROUTE_NOT_FOUND",
    "Not found",
  );
}