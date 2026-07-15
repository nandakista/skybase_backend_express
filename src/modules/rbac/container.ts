import { GetRolePermissionsService } from "./application/services/get-role-permissions.service";
import { GetRolesService } from "./application/services/get-roles.service";
import { RbacDataSourceImpl } from "./data/datasources/postgres/rbac.datasource.impl";
import { RbacRepositoryImpl } from "./data/repositories/rbac.repository.impl";
import { RoleDetailController } from "./presentation/controllers/role-detail.controller";
import { RolesController } from "./presentation/controllers/roles.controller";

const rbacDataSource = new RbacDataSourceImpl();
const rbacRepository = new RbacRepositoryImpl(rbacDataSource);
const getRolePermissionsService = new GetRolePermissionsService(rbacRepository);
const getRolesService = new GetRolesService(rbacRepository);

export const rolesController = new RolesController(getRolesService);
export const rolePermissionsController = new RoleDetailController(getRolePermissionsService);
