import express from "express";

import {
  // addProduct,
  getAllProducts,
  getProduct,
  getProductsByType,
  deleteProduct,
  getProductsByRarity,
} from "../controllers/productController";

const router = express.Router();

router
  .get("/products", getAllProducts)
  .get("/products/:id", getProduct)
  .get("/products/types/:typeName", getProductsByType)
  .delete("/products/:id", deleteProduct)
  .get("/products/rarities/:rarityName", getProductsByRarity);

export default router;
