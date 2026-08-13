import { Router } from "express";
import { authorize } from "../../../../infrastructure/http/middlewares/auth.middleware";
import { validate } from "../../../../infrastructure/http/middlewares/rbac.middleware";
import { Permission } from "../../../../shared/constants/permissions";
import { rolePermissionsController, rolesController } from "../../container";

const router = Router();

router.get(
  "/",
  authorize,
  validate(Permission.CMS_ROLES_READ),
  rolesController.list
);

router.get(
  "/:roleId/permission",
  authorize,
  validate(Permission.CMS_ROLES_READ),
  rolePermissionsController.detail
);

export default router;
