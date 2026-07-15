import type { PermissionRepository } from "../../domain/repositories/permission.repository";

export class PermissionService {
  constructor(private readonly permissionRepository: PermissionRepository) {}

  async hasPermission(roleId: number, permission: string): Promise<boolean> {
    const permissions = await this.permissionRepository.findPermissionsByRoleId(roleId);
    return permissions.includes(permission);
  }

  async getPermissionMatrix(roleId: number): Promise<Array<{ module: string; action: string; name: string }>> {
    return this.permissionRepository.findPermissionMatrixByRoleId(roleId);
  }

  async invalidateRolePermissions(roleId: number): Promise<void> {
    await this.permissionRepository.deletePermissions(roleId);
  }
}
