import { Router } from "express";
import { addProduct } from "../controllers/productController";
import { addUser } from "../controllers/userController";
import { addTransaction } from "../controllers/transactionController";
import { addBundle, updateBundle } from "../controllers/bundlesController";
import { deleteProduct } from "../controllers/productController";

const router = Router();

router
  .post("/products", addProduct)
  .post("/users", addUser)
  .post("/transactions", addTransaction)
  .post("/bundles", addBundle)
  .patch("bundles/:id", updateBundle)
  .delete("/products/:id", deleteProduct);

export default router;
