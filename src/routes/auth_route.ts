import { Router } from "express";
import { loginAuth, refreshToken, registerAuth } from "../controllers/auth_controller";
import { validateRequest } from "../validator/validation_request";
import { loginValidationRules, refreshTokenValidationRules, registerValidationRules } from "../validator/auth_validators";

const authRouter = Router();

authRouter.post('/login', loginValidationRules, validateRequest, loginAuth);
authRouter.post('/register', registerValidationRules, validateRequest, registerAuth);
authRouter.post('/refresh-token', refreshTokenValidationRules, validateRequest, refreshToken);

export default authRouter;
