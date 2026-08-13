import { Router } from "express";

import { authorize } from "../../../../infrastructure/http/middlewares/auth.middleware";
import { dashboardController } from "../../container";

const router = Router();

router.get(
  "/sales-activity",
//   authorize,
  dashboardController.list
);

export default router;
