import { GetSalesActivityService } from "./application/services/get-sales-activity.service";
import { SnowflakeDashboardDataSourceImpl } from "./data/datasources/snowflake/dashboard.datasource.impl";
import { DashboardRepositoryImpl } from "./data/repositories/dashboard.repository.impl";
import { DashboardController } from "./presentation/controllers/dashboard.controller";

const dashboardDataSource = new SnowflakeDashboardDataSourceImpl();
const dashboardRepository = new DashboardRepositoryImpl(dashboardDataSource);
const getSalesActivityService = new GetSalesActivityService(dashboardRepository);

export const dashboardController = new DashboardController(getSalesActivityService);
