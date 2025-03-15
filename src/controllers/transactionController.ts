import { Request, Response } from "express";
import { Transaction } from "../models/transactionModel";
import { Error as MongooseError } from "mongoose";
const { ValidationError } = MongooseError;

// create a transaction
export const addTransaction = async (req:Request, res:Response)=>{
    try{
        const {id, products, price} = req.body;
        const date = new Date();
        const newtransaction = await Transaction.create({
            buyer: id,
            products,
            price,
            date
        });
        res.status(201).json(newtransaction);
    }
    catch(err){
        if(err instanceof ValidationError){
            res.status(400).json({message: err.message});
        } else if (err instanceof Error){
            res.status(500).json({message: err.message});
        } else {
            res.status(500).json({message: "Something went wrong"});
        }
    }
}

// get all transactions
export const getTransactions = async (req:Request, res:Response)=>{
    try{
        const transactions = await Transaction.find();
        res.status(200).json(transactions);
    }
    catch(err){
        err instanceof Error
            ? res.status(500).json({message: err.message})
            : res.status(500).json({message:"Something went wrong"});
    }
}