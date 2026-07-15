import type { RbacDataSource } from "../datasources/postgres/rbac.datasource";
import type { RbacRepository } from "../../domain/repositories/rbac.repository";

export class RbacRepositoryImpl implements RbacRepository {
  constructor(private readonly rbacDataSource: RbacDataSource) {}

  async getAllRoles() {
    return this.rbacDataSource.getAllRoles();
  }

  async getRolePermissions(roleId: number) {
    return this.rbacDataSource.getRolePermissions(roleId);
  }
}
