import type { RbacRepository } from "../../domain/repositories/rbac.repository";

export class GetRolesService {
  constructor(private readonly rbacRepository: RbacRepository) {}

  async execute() {
    return this.rbacRepository.getAllRoles();
  }
}
