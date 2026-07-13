import { Router } from "express";
import { authorize } from "../../../../infrastructure/http/middlewares/auth.middleware";
import { userController, usersController } from "../../container";
import { permission } from "../../../../infrastructure/http/middlewares/rbac.middleware";
import { Permission } from "../../../../shared/constants/permissions";

const router = Router();

router.get(
  "/",
  authorize,
  permission(Permission.USERS_READ),
  usersController.users
);

router.get(
  "/:id",
  authorize,
  permission(Permission.USERS_READ),
  userController.user
);

export default router;
