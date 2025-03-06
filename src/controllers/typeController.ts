import { Request, Response } from "express";
import { Type } from "../models/typeModel";
import { Error as MongooseError } from "mongoose";
const { ValidationError } = MongooseError;

// Get all types
export const getTypes = async(req:Request, res:Response)=>{
    try{
        const types = await Type.find();
        res.status(200).json(types);
    }
    catch(err){
        if (err instanceof Error){
            res.status(500).json({message: err.message});
        } else {
            res.status(500).json({message: "Something went wrong"});
        }
    }
}