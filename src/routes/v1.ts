import { Router } from "express";

import authRoutes from "../modules/auth/presentation/routes/login.routes";
import profileRoutes from "../modules/profile/presentation/routes/profile.routes";
import rbacRoutes from "../modules/rbac/presentation/routes/rbac.routes";
import userRoutes from "../modules/user/presentation/routes/user.routes";

const router = Router();

router.get("/", (_, res) => {
    res.send("Basecode Express API V1");
});

router.get("/health-checker", (_, res) => {
    res.status(200).json({
        status: "ok",
        service: "backend-skybase",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
    });
});

router.use("/auth", authRoutes);
router.use("/profile", profileRoutes);
router.use("/roles", rbacRoutes);
router.use("/users", userRoutes);

export default router;