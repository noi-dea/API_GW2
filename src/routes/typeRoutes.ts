import { Router } from "express";
import { getTypes } from "../controllers/typeController";

const router = Router();

router.get("/types", getTypes);

export default router;