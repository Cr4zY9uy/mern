import { Router } from "express";
import { login, register, logout } from "../controllers/user_controller.js";
import { register_validator, login_validator } from "../validator/user_validator.js";

const router = Router();


router.post('/register', register_validator, register);
router.post('/login', login_validator, login);
router.post('/logout', logout)

export default router;