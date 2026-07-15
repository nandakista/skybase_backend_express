import { Router } from "express";
import { authorize } from "../../../../infrastructure/http/middlewares/auth.middleware";
import { permissionsController, userController, usersController } from "../../container";

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
