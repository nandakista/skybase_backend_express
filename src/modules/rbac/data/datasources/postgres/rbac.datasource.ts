export interface RbacDataSource {
  getAllRoles(): Promise<Array<{ id: number; name: string }>>;
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
