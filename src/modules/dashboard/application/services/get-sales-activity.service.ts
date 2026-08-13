import { PaginationResponseDto } from "../../../../shared/dto/pagination-response.dto";
import type { DashboardRepository } from "../../domain/repositories/dashboard.repository";

export class GetSalesActivityService {
  constructor(private readonly dashboardRepository: DashboardRepository) {}

  async execute(
    page: number,
    limit: number,
  ): Promise<PaginationResponseDto<Record<string, unknown>>> {
    return this.dashboardRepository.getSalesActivity(page, limit);
  }
}
