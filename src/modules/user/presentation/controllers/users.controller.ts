import { NextFunction, Request, Response } from "express";
import type { GetUsersService } from "../../application/services/get-users.service";
import { ResponseHelper } from "../../../../infrastructure/http/response/response.helper";
import { PaginationQueryDto } from "../../../../shared/dto/pagination-query-param.dto";

export class UsersController {
  constructor(private readonly userService: GetUsersService) { }

  users = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const pagination = PaginationQueryDto.from(req.query);

      // const isActive =
      // req.query.is_active !== undefined
      //   ? req.query.is_active === "true"
      //   : undefined;

      console.log("User ID from request:", req.user?.id);
      console.log("Role ID from request:", req.user?.roleId);

      const result = await this.userService.execute(
        pagination.page,
        pagination.limit,
        pagination.search,
      );

      return ResponseHelper.pagination(
        res,
        result,
        "Users retrieved successfully"
      );
    } catch (error) {
      next(error);
    }
  };
}
