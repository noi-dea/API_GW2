import { Router } from "express";

import { getAllRarities } from "../controllers/rarityController";

const router = Router();

/** 
 * @swagger
 * /rarities:
 *   get:
 *     summary: Get all rarities
 *     tags: [Rarities]
 *     responses:
 *       200:
 *         description: List of all rarities
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Rarity'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rarity'
 */

router.get('/rarities', getAllRarities);

export default router;