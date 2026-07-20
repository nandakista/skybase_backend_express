import { PermissionService } from "./application/services/permission.service";
import { PermissionDataSourceImpl } from "./data/datasources/postgres/permission.datasource.impl";
import { PermissionCacheDataSourceImpl } from "./data/datasources/redis/permission.cache.datasource.impl";
import { PermissionRepositoryImpl } from "./data/repositories/permission.repository.impl";

const permissionDataSource = new PermissionDataSourceImpl();
const permissionCacheDataSource = new PermissionCacheDataSourceImpl();
const permissionRepository = new PermissionRepositoryImpl(
  permissionCacheDataSource,
  permissionDataSource
);

export const permissionService = new PermissionService(permissionRepository);
