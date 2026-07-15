import { db } from "../../../../../config/database";
import type { PermissionDataSource } from "./permission.datasource";

export class PermissionDataSourceImpl implements PermissionDataSource {
  async findPermissionsByRoleId(roleId: number): Promise<string[]> {
    const rows = await db("role_permissions")
      .join("permissions", "role_permissions.permission_id", "permissions.id")
      .where("role_permissions.role_id", roleId)
      .select("permissions.name");

    return rows.map((row: { name: string }) => row.name);
  }
  async findPermissionMatrixByRoleId(roleId: number): Promise<Array<{ module: string; action: string; name: string }>> {
    const rows = await db("role_permissions")
      .join("permissions", "role_permissions.permission_id", "permissions.id")
      .where("role_permissions.role_id", roleId)
      .select("permissions.module", "permissions.action", "permissions.name");

    return rows.map((row: { module: string; action: string; name: string }) => ({
      module: row.module,
      action: row.action,
      name: row.name,
    }));
  }}
