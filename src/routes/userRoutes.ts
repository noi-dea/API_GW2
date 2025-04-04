import express from "express";
import { isAuth, isAdmin } from "../middleware/authMiddleWare";
import {
  getUsers,
  getUserById,
  updateUserRole,
  getAllUsersDashboard,
  updateProfilePic,
} from "../controllers/userController";

const router = express.Router();

/** 
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users (protected)
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID (protected)
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User details
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

router
  .get("/users", getUsers)
  .get("/users/admin-view", isAuth, isAdmin, getAllUsersDashboard)
  .get("/users/:id", getUserById)
  .patch("/users/:id/role", isAuth, isAdmin, updateUserRole)
  .patch("/users/:id", updateProfilePic);

export default router;
