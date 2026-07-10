import { Router } from "express";
import { authorize } from "../../../../infrastructure/http/middlewares/auth.middleware";
import { userController, usersController } from "../../container";
import { permission, Role } from "../../../../infrastructure/http/middlewares/permission.middleware";

const router = Router();

router.get(
  "/",
  authorize,
  permission(Role.SUPER_ADMIN),
  usersController.users
);

router.get(
  "/:id",
  authorize,
  permission(Role.SUPER_ADMIN),
  userController.user,
);

export default router;
