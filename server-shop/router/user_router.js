import { Router } from "express";
import { login, register, logout, refresh_access_token,refresh_token } from "../controllers/user_controller.js";
import { register_validator, login_validator } from "../validator/user_validator.js";

const router = Router();


router.post('/register', register_validator, register);
router.post('/login', login_validator, login);
router.post('/logout', logout);
router.post('/refresh_access_token', refresh_access_token)
router.post('/refresh_token', refresh_token)
export default router;