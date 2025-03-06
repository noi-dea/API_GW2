import express from 'express';

import { addUser, getUsers } from '../controllers/userController';

const router = express.Router();

router.post("/users", addUser).get("/users", getUsers);

export default router;