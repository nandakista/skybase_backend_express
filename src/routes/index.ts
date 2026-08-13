import { Router } from "express";
import v1Router from "./v1";

const router = Router();

router.use("/api/v1", v1Router);

/// Add your v2 routes here when you have them
// router.use("/api/v2", v2Router);

export default router;