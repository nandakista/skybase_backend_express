export interface PermissionDataSource {
  findPermissionsByRoleId(roleId: number): Promise<string[]>;
}
