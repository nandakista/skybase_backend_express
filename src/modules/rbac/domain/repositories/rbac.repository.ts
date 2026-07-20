import { Role } from "../entities/role";

export interface RbacRepository {
    getAllRoles(): Promise<Role[]>;

    getRolePermissions(roleId: number): Promise<{
        role: {
            id: number;
            name: string;
        };
        platforms: Array<{
            platform: string;
            permissions: Array<{
                module: string;
                actions: Record<string, boolean>;
            }>;
        }>;
    }>;
}
