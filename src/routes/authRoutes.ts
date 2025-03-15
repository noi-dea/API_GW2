import { Router } from "express";
import {register, login, logout} from "../controllers/authController";
const router = Router();

router.post("/register", register).post("/login", login).get("/logout", logout)

// login
// register
// logout

export default router;