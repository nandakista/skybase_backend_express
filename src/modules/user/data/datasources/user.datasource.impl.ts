import { db } from "../../../../config/database";
import { UserMapper } from "../mappers/user.mapper";
import { paginate } from "../../../../infrastructure/database/postgres/queries/pagination-helper.query";

import { Role } from "../../domain/entities/role";
import { User } from "../../domain/entities/user";
import type { UserDataSource } from "./user.datasource";

export class UserDataSourceImpl implements UserDataSource {
    async getAllUsers(page: number, limit: number, search?: string): Promise<{ data: User[], total: number }> {

        const query = db("users")
            .leftJoin("roles", "roles.id", "users.role_id");

        if (search) {
            query.whereILike("users.name", `%${search}%`);
        }

        // Optional if you using helpers
        // return paginate<User>(query, {
        //     page,
        //     limit,
        //     sortBy: "users.created_at",
        //     sortOrder: "desc",
        //     primaryKey: "users.id",
        // });

        const totalResult = await query
            .clone()
            .count<{ count: string }>("users.id as count")
            .first();

        const data = await query
            .clone()
            .select(
                "users.*",
                "roles.id as role__id",
                "roles.name as role__name",
                "roles.created_at as role__created_at",
                "roles.updated_at as role__updated_at",
                "roles.deleted_at as role__deleted_at",
            )
            .offset((page - 1) * limit)
            .limit(limit);

        return {
            data,
            total: Number(totalResult?.count ?? 0),
        };
    }

    async getUserById(id: number): Promise<User | null> {
        console.log("id =", id);
        const user = await db("users")
            .leftJoin("roles", "roles.id", "users.role_id")
            .select(
                "users.*",
                "roles.id as role__id",
                "roles.name as role__name",
                "roles.created_at as role__created_at",
                "roles.updated_at as role__updated_at",
                "roles.deleted_at as role__deleted_at"
            )
            .where("users.id", id)
            .andWhere("users.deleted_at", null)
            .first();

        if (!user) {
            return null;
        }

        return UserMapper.toEntity(user);
    }
}
