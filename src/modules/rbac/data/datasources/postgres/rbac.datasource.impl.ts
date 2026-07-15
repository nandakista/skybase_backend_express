import { db } from "../../../../../config/database";
import type { RbacDataSource } from "./rbac.datasource";

export class RbacDataSourceImpl implements RbacDataSource {
  async getAllRoles() {
    return db("roles").select("id", "name").orderBy("id");
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
