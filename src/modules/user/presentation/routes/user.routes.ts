import { Router } from "express";
import { authorize } from "../../../../infrastructure/http/middlewares/auth.middleware";
import { permissionsController, userController, usersController } from "../../container";
import { permission } from "../../../../infrastructure/http/middlewares/rbac.middleware";
import { Permission } from "../../../../shared/constants/permissions";

const router = Router();

router.get(
  "/",
  authorize,
  usersController.users
);

router.get(
  "/permissions",
  authorize,
  permissionsController.list
);

router.get(
  "/:id",
  authorize,
  userController.user
);

export default router;
