import { Router } from "express";
import { addProduct } from "../controllers/productController";
import { addUser } from "../controllers/userController";

const router = Router();

router.post("/products", addProduct).post("/users", addUser);

export default router;