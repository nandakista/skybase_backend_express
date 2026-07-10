import { Role } from "../../domain/entities/role";

export class RoleMapper {
    static toEntity(row: any): Role {
        return {
            id: Number(row.role__id),
            name: row.role__name,
            createdAt: row.role__created_at,
            updatedAt: row.role__updated_at,
            deletedAt: row.role__deleted_at,
        };
    }
}