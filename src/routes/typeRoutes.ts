import { Router } from "express";
import { getTypes, getTypeByName } from "../controllers/typeController";

const router = Router();

/** 
 * @swagger
 * /types:
 *   get:
 *     summary: Get all types
 *     tags: [Types]
 *     responses:
 *       200:
 *         description: List of all types
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Type'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Type'
 * /types/{name}:
 *   get:
 *     summary: Get a type by name
 *     tags: [Types]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User details
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Type'
 */

router
.get("/types", getTypes)
.get("/types/:name", getTypeByName);

export default router;