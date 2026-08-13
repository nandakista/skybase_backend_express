import { PaginationResponseDto } from "../../../../shared/dto/pagination-response.dto";

export interface DashboardRepository {
  getSalesActivity(
    page: number,
    limit: number,
  ): Promise<PaginationResponseDto<Record<string, unknown>>>;
}
