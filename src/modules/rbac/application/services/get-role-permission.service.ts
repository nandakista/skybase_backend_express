import type { RbacRepository } from "../../domain/repositories/rbac.repository";

export class GetRolePermissionService {
  constructor(private readonly rbacRepository: RbacRepository) {}

  async execute(roleId: number) {
    return this.rbacRepository.getRolePermissions(roleId);
  }
}
