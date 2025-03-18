import { Router } from "express";
import { register, login, logout } from "../controllers/authController";
const router = Router();

router.post("/register", register).post("/login", login).get("/logout", logout);

// login
// register
// logout
router.post("/login", login);
router.get("/logout", (req, res) => {
  res.cookie("token", "", { httpOnly: true, maxAge: 1 });
  res.redirect("/login");
});

export default router;
