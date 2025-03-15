import { Request, Response } from "express";
import { Transaction } from "../models/transactionModel";
import { Error as MongooseError } from "mongoose";
const { ValidationError } = MongooseError;

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