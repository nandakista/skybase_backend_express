export interface PermissionCacheDataSource {
  getPermissions(roleId: number): Promise<string[] | null>;
  setPermissions(roleId: number, permissions: string[]): Promise<void>;
  deletePermissions(roleId: number): Promise<void>;
}
