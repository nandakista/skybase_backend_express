import { createClient } from "redis";
import { env } from "../../../config/env";

export const client = createClient(
  env.redis.url
    ? {
        url: env.redis.url,
      }
    : {
        socket: {
          host: env.redis.host,
          port: env.redis.port,
        },
        password: env.redis.password,
      }
);

client.on("error", (error) => {
  console.error("Redis Client Error", error);
});

let connected = false;

export async function connectRedis(): Promise<void> {
  if (!connected) {
    await client.connect();
    connected = true;
  }
}

export { client as redisClient };
