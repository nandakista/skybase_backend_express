import { PaginationResponseDto } from "../../../../shared/dto/pagination-response.dto";
import type { DashboardDataSource } from "../datasources/dashboard.datasource";
import type { DashboardRepository } from "../../domain/repositories/dashboard.repository";

export class DashboardRepositoryImpl implements DashboardRepository {
  constructor(private readonly dashboardDataSource: DashboardDataSource) {}

  async getSalesActivity(
    page: number,
    limit: number,
  ): Promise<PaginationResponseDto<Record<string, unknown>>> {
    return this.dashboardDataSource.getSalesActivity(page, limit);
  }
}
