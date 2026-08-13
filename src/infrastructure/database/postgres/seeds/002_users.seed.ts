import type { Knex } from "knex";
import bcrypt from "bcrypt";

export async function seed(knex: Knex): Promise<void> {
  await knex("users").del();

  // Reset auto increment (PostgreSQL)
  await knex.raw("ALTER SEQUENCE users_id_seq RESTART WITH 1");

  const password = await bcrypt.hash("admin123", 10);

  await knex("users").insert([
    // Admin
    {
      name: "Super Administrator",
      email: "super.admin@example.com",
      password,
      role_id: 1,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },

    // Users
    {
      name: "John Doe Admin",
      email: "admin@example.com",
      password,
      role_id: 2,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      name: "Jane Smith Maintainer",
      email: "maintainer@example.com",
      password,
      role_id: 3,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      name: "Michael Johnson",
      email: "michael@example.com",
      password,
      role_id: 4,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      name: "Emily Davis",
      email: "emily@example.com",
      password,
      role_id: 4,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      name: "William Brown",
      email: "william@example.com",
      password,
      role_id: 4,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      name: "Olivia Wilson",
      email: "olivia@example.com",
      password,
      role_id: 4,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      name: "James Taylor",
      email: "james@example.com",
      password,
      role_id: 4,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      name: "Sophia Anderson",
      email: "sophia@example.com",
      password,
      role_id: 4,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      name: "Daniel Thomas",
      email: "daniel@example.com",
      password,
      role_id: 4,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
    {
      name: "Isabella Martinez",
      email: "isabella@example.com",
      password,
      role_id: 4,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    },
  ]);
}