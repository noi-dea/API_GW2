import { Router } from "express";
import { addProduct } from "../controllers/productController";
import { addUser } from "../controllers/userController";
import { addTransaction } from "../controllers/transactionController";

const router = Router();

router.post("/products", addProduct).post("/users", addUser).post("/transactions", addTransaction);

export default router;