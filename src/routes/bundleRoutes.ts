import { Router } from "express"
import {  getBundleById, getBundlesByQuery } from "../controllers/bundlesController";



const router = Router();

/** 
 * @swagger
 * /bundles:
 *   get:
 *     summary: Get all events
 *     tags: [Bundles]
 *     responses:
 *       200:
 *         description: List of all bundles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Bundle'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 * 
 * /bundles/{id}:
 *   get:
 *     summary: Get a bundle by ID
 *     tags: [Bundles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Bundle details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bundle'
 */

router
    .get("/bundles", getBundlesByQuery)
    .get("/bundles/:id", getBundleById);


export default router;