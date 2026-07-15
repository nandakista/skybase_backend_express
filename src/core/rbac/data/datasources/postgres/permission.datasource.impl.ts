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
}
