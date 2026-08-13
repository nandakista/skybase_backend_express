import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex.raw(`
    TRUNCATE TABLE permissions
    RESTART IDENTITY CASCADE
  `);

  const platformModules = await knex("platform_modules as pm")
    .join("platforms as p", "p.id", "pm.platform_id")
    .join("modules as m", "m.id", "pm.module_id")
    .select(
      "pm.id",
      "p.code as platform_code",
      "m.code as module_code",
    );

  const platformModuleMap = Object.fromEntries(
    platformModules.map((pm) => [
      `${pm.platform_code}.${pm.module_code}`,
      pm.id,
    ]),
  );

  const permissions: Array<{
    platform_module_id: number;
    action: string;
    name: string;
  }> = [];

  const addPermissions = (
    platform: string,
    module: string,
    actions: string[],
  ) => {
    const key = `${platform}.${module}`;
    const platformModuleId = platformModuleMap[key];

    if (!platformModuleId) {
      throw new Error(`Platform module '${key}' not found.`);
    }

    for (const action of actions) {
      permissions.push({
        platform_module_id: platformModuleId,
        action,
        name: `${platform}.${module}.${action}`,
      });
    }
  };

  // CMS
  addPermissions("cms", "users", [
    "read",
    "create",
    "update",
    "delete",
  ]);

  addPermissions("cms", "roles", [
    "read",
    "create",
    "update",
    "delete",
  ]);

  // Mobile
  addPermissions("mobile", "users", [
    "read",
    "update",
  ]);

  await knex("permissions").insert(permissions);
}