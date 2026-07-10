import { Router } from "express";

import authRoutes from "../modules/auth/presentation/routes/login.routes";
import profileRoutes from "../modules/profile/presentation/routes/profile.routes";
import userRoutes from "../modules/user/presentation/routes/user.routes";

const router = Router();

router.get("/", (_, res) => {
    res.send("Basecode Express");
});

router.use("/auth", authRoutes);
router.use("/profile", profileRoutes);
router.use("/users", userRoutes);

export default router;