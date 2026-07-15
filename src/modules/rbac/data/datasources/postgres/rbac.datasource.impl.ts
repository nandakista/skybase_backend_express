import { db } from "../../../../../config/database";
import { Role } from "../../../domain/entities/role";
import type { RbacDataSource } from "./rbac.datasource";

export class RbacDataSourceImpl implements RbacDataSource {
    async getAllRoles(): Promise<Role[]> {
        const rows = await db("roles")
            .select("id", "name", "created_at", "updated_at", "deleted_at")
            .whereNull("deleted_at");

        return rows.map((row) => ({
            id: Number(row.id),
            name: row.name,
            createdAt: row.created_at,
            updatedAt: row.updated_at,
            deletedAt: row.deleted_at,
        }));
    }

  async getRolePermissions(roleId: number) {
    const role = await db("roles")
      .select("id", "name")
      .where({ id: roleId })
      .first();

    if (!role) {
      return {
        role: { id: roleId, name: "" },
        permissions: [],
      };
    }

    const rows = await db("role_permissions")
      .join("permissions", "role_permissions.permission_id", "permissions.id")
      .where("role_permissions.role_id", roleId)
      .select("permissions.module", "permissions.action");

    const permissionsByModule = new Map<string, Record<string, boolean>>();

    for (const row of rows) {
      const moduleName = row.module;
      const actionName = row.action;

      if (!permissionsByModule.has(moduleName)) {
        permissionsByModule.set(moduleName, {
          create: false,
          read: false,
          update: false,
          delete: false,
        });
      }

      const actions = permissionsByModule.get(moduleName)!;
      actions[actionName] = true;
    }

    return {
      role: {
        id: Number(role.id),
        name: role.name,
      },
      permissions: Array.from(permissionsByModule.entries()).map(([module, actions]) => ({
        module,
        actions,
      })),
    };
  }
}
