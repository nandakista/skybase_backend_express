import { Router } from "express";
import { authorize } from "../../../../infrastructure/http/middlewares/auth.middleware";
import { permission } from "../../../../infrastructure/http/middlewares/rbac.middleware";
import { Permission } from "../../../../shared/constants/permissions";
import { rolePermissionsController, rolesController } from "../../container";

const router = Router();

router.get(
  "/",
  authorize,
  permission(Permission.ROLES_READ),
  rolesController.list
);

router.get(
  "/:roleId/permission",
  authorize,
  permission(Permission.ROLES_READ),
  rolePermissionsController.detail
);

export default router;
