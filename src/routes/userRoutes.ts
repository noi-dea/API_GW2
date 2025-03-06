import express from 'express';

import { addUser, getUsers, getUserById } from '../controllers/userController';

const router = express.Router();

router
.post("/users", addUser)
.get("/users", getUsers)
.get("/users/:id", getUserById);

export default router;