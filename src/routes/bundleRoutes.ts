import { Router } from "express"
import { getBundleById, getBundlesByQuery } from "../controllers/bundlesController";



const router = Router();

router
    .get("/bundles", getBundlesByQuery)
    .get("/bundles/:id", getBundleById);


export default router;