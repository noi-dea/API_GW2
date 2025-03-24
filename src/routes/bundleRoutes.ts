import { Router } from "express";
import {
  getBundleById,
  getBundlesByQuery,
  deleteBundle,
} from "../controllers/bundlesController";

const router = Router();

router
  .get("/bundles", getBundlesByQuery)
  .get("/bundles/:id", getBundleById)
  .delete("/bundles/:id", deleteBundle);

export default router;
