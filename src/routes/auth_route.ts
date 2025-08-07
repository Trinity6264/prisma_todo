import { Router } from "express";
import { loginAuth, refreshAuth, registerAuth } from "../controllers/auth_controller";
import { validateRequest } from "../validator/validation_request";
import { registerValidationRules } from "../validator/auth_validators";

const authRouter = Router();

authRouter.post('/login', loginAuth);
authRouter.post('/register', registerValidationRules, validateRequest, registerAuth);
authRouter.post('/refresh', refreshAuth);

export default authRouter;
