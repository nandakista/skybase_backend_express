import "dotenv/config";
import knex from "knex";
import pg from "pg";
import { env } from "./env";

// Parse BIGINT (OID 20) to number
pg.types.setTypeParser(20, (value) => Number(value));

export const db = knex({
    client: "pg",
    connection: {
        host: env.database.host,
        port: Number(env.database.port),
        user: env.database.user,
        password: env.database.password,
        database: env.database.name,
    },
});