import "dotenv/config";
import type { Knex } from "knex";
import { env } from "./src/config/env";

const config: Record<string, Knex.Config> = {
  development: {
    client: "pg",
    connection: {
      host: env.database.host,
      port: Number(env.database.port),
      database: env.database.name,
      user: env.database.user,
      password: env.database.password,
    },
    
    pool: {
    min: 2,
    max: 10,
    },

    migrations: {
      directory: "./src/infrastructure/database/postgres/migrations",
      tableName: "knex_migrations",
    },

    seeds: {
      directory: "./src/infrastructure/database/postgres/seeds",
    },
  },
  production: { 
    /// TODO: Write configuration for production environment here
  },
};

export default config;