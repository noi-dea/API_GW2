import { Router } from "express";

import { getAllRarities } from "../controllers/rarityController";

const router = Router();

router.get('/rarities', getAllRarities);