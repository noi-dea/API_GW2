import { Router } from "express";
import { getTransactions, getTransactionById } from "../controllers/transactionController";

const router = Router();

router
    .get("/transactions", getTransactions)
    .get("/transactions/:id", getTransactionById);

export default router;