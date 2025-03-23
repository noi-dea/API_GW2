import { Router } from "express";
import { addProduct } from "../controllers/productController";
import { addUser } from "../controllers/userController";
import { addTransaction } from "../controllers/transactionController";
import { addBundle, updateBundle } from "../controllers/bundlesController";

const router = Router();

router
  .post("/products", addProduct)
  .post("/users", addUser)
  .post("/transactions", addTransaction)
  .post("/bundles", addBundle)
  .patch("bundles/:id", updateBundle);

export default router;
