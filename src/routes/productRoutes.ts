import express from "express";

import {
  // addProduct,
  getAllProducts,
  getProduct,
  getProductsByType,
  deleteProduct,
  getProductsByRarity,
  getProductsByRarityQuery
} from "../controllers/productController";

const router = express.Router();

/** 
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of all products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 * /products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product details
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 * /products/types/{typeName}:
 *   get:
 *     summary: Get all products with type typeName
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: typeName
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of products with specified type
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 * /products/rarities/{rarityName}:
 *   get:
 *     summary: Get all products with rarity rarityName
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: rarityName
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of products with specified rarity
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */

router
  .get("/products", getProductsByRarityQuery)
  .get("/products/:id", getProduct)
  .get("/products/types/:typeName", getProductsByType)
  .get("/products/rarities/:rarityName", getProductsByRarity);

export default router;
