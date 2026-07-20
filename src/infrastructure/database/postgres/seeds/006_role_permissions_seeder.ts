import { Knex } from "knex";

async function assignPermissions(
  knex: Knex,
  roleName: string,
  permissionNames: string[]
): Promise<void> {
  const role = await knex("roles")
    .where({ name: roleName })
    .first();

  if (!role) {
    throw new Error(`Role '${roleName}' not found`);
  }

  const permissions = await knex("permissions")
    .whereIn("name", permissionNames);

  await knex("role_permissions").insert(
    permissions.map((permission) => ({
      role_id: role.id,
      permission_id: permission.id,
    }))
  );
}

export async function seed(knex: Knex): Promise<void> {
  await knex("role_permissions").del();

  // Semua permission
  const allPermissions = (
    await knex("permissions").select("name")
  ).map((permission) => permission.name);

  // SUPER ADMIN
  await assignPermissions(
    knex,
    "super_admin",
    allPermissions
  );

  // ADMIN
  await assignPermissions(
    knex,
    "admin",
    [
      "users.read",
      "users.create",
      "users.update",
      "users.delete",

      "roles.read",
      "roles.create",
      "roles.update",
    ]
  );

  // MAINTAINER
  await assignPermissions(
    knex,
    "maintainer",
    [
      "users.read",
      "users.create",
      "users.update",

      "roles.read",
      "roles.create",
      "roles.update",
    ]
  );

  // USER
  await assignPermissions(
    knex,
    "user",
    [
      "users.read",
      "users.update",
    ]
  );

  // GUEST
  await assignPermissions(
    knex,
    "guest",
    [
      "users.read",
    ]
  );
}