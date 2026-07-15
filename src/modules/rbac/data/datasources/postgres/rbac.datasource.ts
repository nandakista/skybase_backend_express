import { Role } from "../../../domain/entities/role";

export interface RbacDataSource {
  getAllRoles(): Promise<Role[]>;

  getRolePermissions(roleId: number): Promise<{
    role: {
      id: number;
      name: string;
    };
    permissions: Array<{
      module: string;
      actions: Record<string, boolean>;
    }>;
  }>;
}
