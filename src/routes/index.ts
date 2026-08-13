import { Router } from "express";

import authRoutes from "../modules/auth/presentation/routes/login.routes";
import dashboardRoutes from "../modules/dashboard/presentation/routes/dashboard.routes";
import profileRoutes from "../modules/profile/presentation/routes/profile.routes";
import rbacRoutes from "../modules/rbac/presentation/routes/rbac.routes";
import userRoutes from "../modules/user/presentation/routes/user.routes";

const router = Router();

router.get("/", (_, res) => {
    res.send("Basecode Express");
});

router.use("/auth", authRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/profile", profileRoutes);
router.use("/roles", rbacRoutes);
router.use("/users", userRoutes);

export default router;