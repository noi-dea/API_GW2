import { Router } from "express";
import { getTypes, getTypeByName } from "../controllers/typeController";

const router = Router();

router
.get("/types", getTypes)
.get("/types/:name", getTypeByName);

export default router;