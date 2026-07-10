import "dotenv/config";
import type { Knex } from "knex";

const config: Record<string, Knex.Config> = {
  development: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
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