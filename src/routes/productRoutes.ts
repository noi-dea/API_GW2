import express from "express";

import {
  addProduct,
  getAllProducts,
  getProduct,
  getProductsByType,
} from "../controllers/productController";

const router = express.Router();

router
  .get("/products", getAllProducts)
  .get("/products/:id", getProduct)
  .get("/products/types/:typeName", getProductsByType);
  
export default router;
