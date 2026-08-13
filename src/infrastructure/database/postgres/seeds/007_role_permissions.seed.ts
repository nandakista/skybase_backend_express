import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex.raw(`
    TRUNCATE TABLE role_permissions CASCADE
  `);

  const roles = await knex("roles").select("id", "code");
  const permissions = await knex("permissions").select("id", "name");

  const roleMap = Object.fromEntries(
    roles.map((role) => [role.code, role.id]),
  );

  const permissionMap = Object.fromEntries(
    permissions.map((permission) => [permission.name, permission.id]),
  );

  const rolePermissions: Array<{
    role_id: number;
    permission_id: number;
  }> = [];

  const assignPermissions = (
    roleCode: string,
    permissionNames: string[],
  ) => {
    const roleId = roleMap[roleCode];

    if (!roleId) {
      throw new Error(`Role '${roleCode}' not found.`);
    }

    for (const permissionName of permissionNames) {
      const permissionId = permissionMap[permissionName];

      if (!permissionId) {
        throw new Error(`Permission '${permissionName}' not found.`);
      }

      rolePermissions.push({
        role_id: roleId,
        permission_id: permissionId,
      });
    }
  };

  // SUPER ADMIN
  assignPermissions(
    "super_admin",
    Object.keys(permissionMap),
  );

  // ADMIN
  assignPermissions("admin", [
    "cms.users.read",
    "cms.users.create",
    "cms.users.update",
    "cms.users.delete",

    "cms.roles.read",
    "cms.roles.create",
    "cms.roles.update",
    "cms.roles.delete",

    "mobile.users.read",
    "mobile.users.update",
  ]);

  // MAINTAINER
  assignPermissions("maintainer", [
    "cms.users.read",
    "cms.users.update",

    "cms.roles.read",

    "mobile.users.read",
    "mobile.users.update",
  ]);

  // USER
  assignPermissions("user", [
    "mobile.users.read",
    "mobile.users.update",
  ]);

  // GUEST
  assignPermissions("guest", [
    "mobile.users.read",
  ]);

  await knex("role_permissions").insert(rolePermissions);
}