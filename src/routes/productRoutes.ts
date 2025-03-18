import express from "express";

import {
  // addProduct,
  getAllProducts,
  getProduct,
  getProductsByType,
  deleteProduct,
} from "../controllers/productController";

const router = express.Router();

router.get("/products", getAllProducts);
router.get("/products/:id", getProduct);
router.get("/products/types/:typeName", getProductsByType);
router.delete("/products/:id", deleteProduct);
// router
//   .get("/products", getAllProducts)
//   .get("/products/:id", getProduct)
//   .get("/products/types/:typeName", getProductsByType)
//   .delete("/products/:id", deleteProduct);

export default router;
