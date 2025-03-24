import { Router } from "express";
import { addProduct } from "../controllers/productController";
import { addUser } from "../controllers/userController";
import { addTransaction } from "../controllers/transactionController";
import { addBundle, updateBundle } from "../controllers/bundlesController";
import { deleteProduct } from "../controllers/productController";

const router = Router();

/** 
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product (secured)
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - hitPoints
 *               - abilities
 *               - imageURL
 *               - types
 *               - price
 *               - rarity
 *             properties:
 *               name:
 *                 type: string
 *               hitPoints:
 *                 type: number
 *               abilities:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   cost:
 *                     type: number
 *                   damage:
 *                     type: number
 *               imageURL:
 *                 type: string
 *               types:
 *                 type: array
 *                 items: 
 *                   type: string
 *               price:
 *                 type: number
 *               rarity:
 *                 type: string
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 * /users:
 *   post:
 *     summary: Create a new user (secured)
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - wishlist
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               wishlist:
 *                 type: array
 *                 items:
 *                   type: string
 *               role:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 * /transactions:
 *   post:
 *     summary: Create a new transaction (secured)
 *     tags: [Transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - buyer
 *               - products
 *               - price
 *               - date
 *             properties:
 *               buyer:
 *                 type: string
 *               products:
 *                 type: array
 *                 items:
 *                   type: string
 *               price:
 *                 type: number
 *               date:
 *                 type: date
 *     responses:
 *       201:
 *         description: Transaction created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 * /bundles:
 *   post:
 *     summary: Create a new bundle (secured)
 *     tags: [Bundles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - type
 *               - series
 *               - img
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *               series:
 *                 type: string
 *               img:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: Bundle created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bundle'
 * /bundles/{id}:
 *   patch:
 *     summary: Update an existing bundle (secured)
 *     tags: [Bundles]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - type
 *               - series
 *               - img
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *               series:
 *                 type: string
 *               img:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Bundle successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bundle'
 * /products/{id}:
 *   delete:
 *     summary: Deletes a product (secured)
 *     tags: [Products]
 *     requestBody:
 *       required: false
 *             
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */

router
  .post("/products", addProduct)
  .post("/users", addUser)
  .post("/transactions", addTransaction)
  .post("/bundles", addBundle)
  .patch("bundles/:id", updateBundle)
  .delete("/products/:id", deleteProduct);

export default router;
