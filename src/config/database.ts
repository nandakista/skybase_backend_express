import "dotenv/config";
import knex from "knex";
import pg from "pg";

// Parse BIGINT (OID 20) to number
pg.types.setTypeParser(20, (value) => Number(value));

export const db = knex({
    client: "pg",
    connection: {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    },
});