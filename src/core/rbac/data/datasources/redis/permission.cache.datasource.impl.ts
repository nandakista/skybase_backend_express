import { redisClient, connectRedis } from "../../../../../infrastructure/cache/redis/redis";
import type { PermissionCacheDataSource } from "./permission.cache.datasource";

const REDIS_KEY_PREFIX = "permission:role:";

export class PermissionCacheDataSourceImpl implements PermissionCacheDataSource {
  async getPermissions(roleId: number): Promise<string[] | null> {
    await connectRedis();

    const raw = await redisClient.get(`${REDIS_KEY_PREFIX}${roleId}`);

    if (!raw) {
      return null;
    }

    try {
      return JSON.parse(raw) as string[];
    } catch {
      return null;
    }
  }

  async setPermissions(roleId: number, permissions: string[]): Promise<void> {
    await connectRedis();
    await redisClient.set(
      `${REDIS_KEY_PREFIX}${roleId}`,
      JSON.stringify(permissions)
    );
  }

  async deletePermissions(roleId: number): Promise<void> {
    await connectRedis();
    await redisClient.del(`${REDIS_KEY_PREFIX}${roleId}`);
  }
}
