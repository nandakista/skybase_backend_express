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
        platforms: [],
      };
    }

    const rows = await db("role_permissions as rp")
      .join("permissions as p", "rp.permission_id", "p.id")
      .join("platform_modules as pm", "p.platform_module_id", "pm.id")
      .join("modules as m", "pm.module_id", "m.id")
      .join("platforms as pl", "pm.platform_id", "pl.id")
      .where("rp.role_id", roleId)
      .select(
        "pl.code as platform",
        "m.name as module",
        "p.action"
      )
      .orderBy("pl.code")
      .orderBy("m.name");

    const platformsMap = new Map<string, Map<string, Record<string, boolean>>>();

    for (const row of rows) {
      const platformName = row.platform;
      const moduleName = row.module;
      const actionName = row.action;

      if (!platformsMap.has(platformName)) {
        platformsMap.set(platformName, new Map());
      }

      const moduleMap = platformsMap.get(platformName)!;

      if (!moduleMap.has(moduleName)) {
        moduleMap.set(moduleName, {
          create: false,
          read: false,
          update: false,
          delete: false,
        });
      }

      const actions = moduleMap.get(moduleName)!;
      actions[actionName] = true;
    }

    return {
      role: {
        id: Number(role.id),
        name: role.name,
      },
      platforms: Array.from(platformsMap.entries()).map(([platform, modulesMap]) => ({
        platform,
        permissions: Array.from(modulesMap.entries()).map(([module, actions]) => ({
          module,
          actions,
        })),
      })),
    };
  }
}
