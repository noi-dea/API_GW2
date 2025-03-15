import { Router } from "express";
import { getTransactions } from "../controllers/transactionController";

const router = Router();

router.get("/transactions", getTransactions);

export default router;