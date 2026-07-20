export interface PermissionRepository {
  findPermissionsByRoleId(roleId: number): Promise<string[]>;
  deletePermissions(roleId: number): Promise<void>;
}
