import type { PermissionCacheDataSource } from "../datasources/redis/permission.cache.datasource";
import type { PermissionDataSource } from "../datasources/postgres/permission.datasource";
import type { PermissionRepository } from "../../domain/repositories/permission.repository";

export class PermissionRepositoryImpl implements PermissionRepository {
  constructor(
    private readonly cacheDataSource: PermissionCacheDataSource,
    private readonly permissionDataSource: PermissionDataSource
  ) {}

  async findPermissionsByRoleId(roleId: number): Promise<string[]> {
    try {
      const cachedPermissions = await this.cacheDataSource.getPermissions(roleId);

      if (cachedPermissions) {
        return cachedPermissions;
      }
    } catch (error) {
      console.error("Redis cache read failed", error);
    }

    const permissions = await this.permissionDataSource.findPermissionsByRoleId(roleId);

    try {
      await this.cacheDataSource.setPermissions(roleId, permissions);
    } catch (error) {
      console.error("Redis cache write failed", error);
    }

    return permissions;
  }

  async findPermissionMatrixByRoleId(roleId: number): Promise<Array<{ module: string; action: string; name: string }>> {
    return this.permissionDataSource.findPermissionMatrixByRoleId(roleId);
  }

  async deletePermissions(roleId: number): Promise<void> {
    await this.cacheDataSource.deletePermissions(roleId);
  }
}
