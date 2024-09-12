import { Router } from "express";
import { ROUTES } from "../../constants/routes";
import registerController from "./controllers/register.controller";
import {
  forgottenPasswordSchema,
  loginSchema,
  registerSchema,
  verifyOtpSchema,
} from "../../schemas/auth.schema";
import bodyValidation from "../../middlewares/body-validation";
import loginController from "./controllers/login.controller";
import forgottenPasswordController from "./controllers/forgotten-password.controller";
import verifyOtpController from "./controllers/verify-otp.controller";

const authRoute = Router();

// registration
authRoute.post(
  ROUTES.REGISTER,
  registerSchema,
  bodyValidation,
  registerController
);

authRoute.post(ROUTES.LOGIN, loginSchema, bodyValidation, loginController);
authRoute.post(
  ROUTES.FORGOTTEN_PASSWORD,
  forgottenPasswordSchema,
  bodyValidation,
  forgottenPasswordController
);
authRoute.post(
  ROUTES.VERIFY_FORGOTTEN_PASSWORD,
  verifyOtpSchema,
  bodyValidation,
  verifyOtpController
);

export default authRoute;
