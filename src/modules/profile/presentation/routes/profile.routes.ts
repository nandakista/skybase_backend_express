import { Router } from "express";

import { authorize } from "../../../../infrastructure/http/middlewares/auth.middleware";
import { profileController } from "../../container";

const router = Router();

router.get(
  "/",
  authorize,
  profileController.profile
);

export default router;