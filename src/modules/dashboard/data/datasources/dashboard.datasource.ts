import { PaginationResponseDto } from "../../../../shared/dto/pagination-response.dto";

export interface DashboardDataSource {
  getSalesActivity(
    page: number,
    limit: number,
  ): Promise<PaginationResponseDto<Record<string, unknown>>>;
}
