import { Router } from "express";
import { validate } from "../../../../infrastructure/http/middlewares/validation.middleware";
import { loginSchema } from "../validators/login.validator";
import { loginController } from "../../container";

const router = Router();

router.post(
    "/login",
    validate(loginSchema),
    loginController.login,
);

export default router;