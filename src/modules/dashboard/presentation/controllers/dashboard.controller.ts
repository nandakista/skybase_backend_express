import { NextFunction, Request, Response } from "express";

import { ResponseHelper } from "../../../../infrastructure/http/response/response.helper";
import { PaginationQueryDto } from "../../../../shared/dto/pagination-query-param.dto";
import type { GetSalesActivityService } from "../../application/services/get-sales-activity.service";

export class DashboardController {
  constructor(private readonly getSalesActivityService: GetSalesActivityService) {}

  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const pagination = PaginationQueryDto.from(req.query);
      const result = await this.getSalesActivityService.execute(
        pagination.page,
        pagination.limit,
      );

      return ResponseHelper.pagination(
        res,
        result,
        "Sales activity retrieved successfully",
      );
    } catch (error) {
      next(error);
    }
  };
}
