import { GetRolePermissionService } from "./application/services/get-role-permission.service";
import { GetRolePermissionsService } from "./application/services/get-role-permissions.service";
import { GetRolesService } from "./application/services/get-roles.service";
import { RbacDataSourceImpl } from "./data/datasources/postgres/rbac.datasource.impl";
import { RbacRepositoryImpl } from "./data/repositories/rbac.repository.impl";
import { RbacController } from "./presentation/controllers/rbac.controller";
import { RolePermissionsController } from "./presentation/controllers/role-permissions.controller";
import { RolesController } from "./presentation/controllers/roles.controller";

const rbacDataSource = new RbacDataSourceImpl();
const rbacRepository = new RbacRepositoryImpl(rbacDataSource);
const getRolePermissionService = new GetRolePermissionService(rbacRepository);
const getRolePermissionsService = new GetRolePermissionsService(rbacRepository);
const getRolesService = new GetRolesService(rbacRepository);

export const rbacController = new RbacController(getRolePermissionService);
export const rolesController = new RolesController(getRolesService);
export const rolePermissionsController = new RolePermissionsController(getRolePermissionsService);
