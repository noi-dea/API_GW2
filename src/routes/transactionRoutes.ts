import { Router } from "express";
import { getTransactions, getTransactionById, getTransactionsByBuyerId } from "../controllers/transactionController";

const router = Router();

router
    .get("/transactions", getTransactions)
    .get("/transactions/:id", getTransactionById)
    .get("/transactions/profile/:id", getTransactionsByBuyerId);

export default router;