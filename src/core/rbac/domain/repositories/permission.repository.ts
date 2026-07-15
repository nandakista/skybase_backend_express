export interface PermissionRepository {
  findPermissionsByRoleId(roleId: number): Promise<string[]>;
  findPermissionMatrixByRoleId(roleId: number): Promise<Array<{ module: string; action: string; name: string }>>;
  deletePermissions(roleId: number): Promise<void>;
}
