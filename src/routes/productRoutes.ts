import express from "express";

import {
  addProduct,
  getAllProducts,
  getProduct,
} from "../controllers/productController";

const router = express.Router();

router
  .get("/products", getAllProducts)
  .get("/products/:id", getProduct)
  .post("/products", addProduct);

export default router;
