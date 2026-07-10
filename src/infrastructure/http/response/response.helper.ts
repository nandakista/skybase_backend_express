import { Response } from "express";
import { ApiResponse } from "./api-response";
import { PaginationResponseDto } from "../../../shared/dto/pagination-response.dto";

export class ResponseHelper {
  static success<T>(
    res: Response,
    data: T,
    message = "Success",
    status = 200
  ) {
    const response: ApiResponse<T> = {
      success: true,
      message,
      status,
      data,
    };

    return res.status(status).json(response);
  }

  static created<T>(
    res: Response,
    data: T,
    message = "Created",
    status = 201
  ) {
    const response: ApiResponse<T> = {
      success: true,
      message,
      status,
      data,
    };

    return res.status(status).json(response);
  }

  static error(
    res: Response,
    status: number,
    message: string,
    error?: string
  ) {
    const response: ApiResponse = {
      success: false,
      message,
      status,
      error,
    };

    return res.status(status).json(response);
  }

  static pagination<T>(
    res: Response,
    result: PaginationResponseDto<T>,
    message = "Success",
    status = 200,
  ) {
    if (!(result instanceof PaginationResponseDto)) {
      throw new Error(
        "ResponseHelper.pagination() only accepts PaginationResponseDto.",
      );
    }

    const from =
      result.total === 0
        ? 0
        : (result.page - 1) * result.limit + 1;

    const to = Math.min(
      result.page * result.limit,
      result.total,
    );

    return res.status(status).json({
      success: true,
      message,
      status,
      error: null,
      data: result.data,
      meta: {
        from,
        to,
        current_page: result.page,
        last_page: result.totalPages,
        per_page: result.limit,
        total: result.total,
      },
    });
  }
}