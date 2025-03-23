import express from "express";
import { isAuth, isAdmin } from "../middleware/authMiddleWare";
import {
  getUsers,
  getUserById,
  updateUserRole,
  getAllUsersDashboard,
} from "../controllers/userController";

const router = express.Router();

router
  .get("/users", getUsers)
  .get("/users/admin-view", isAuth, isAdmin, getAllUsersDashboard)
  .get("/users/:id", getUserById)
  .patch("/users/:id/role", isAuth, isAdmin, updateUserRole);

export default router;
