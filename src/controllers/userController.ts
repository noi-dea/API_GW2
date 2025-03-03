import { Request, Response } from "express";
import { User } from "../models/userModel";
import { Error as MongooseError } from "mongoose";
const { ValidationError } = MongooseError;

// Create/add a user into the database
export const addUser = async (req:Request,res:Response)=>{
    try{
        const {name, email, avatar, password} = req.body;
        const encryptedPass = password //TODO password encryption --> happens durng auth creation
        if (avatar){
            const newUser = await User.create({name, email, avatar, password: encryptedPass});
        } else {
            const newUser = await User.create({name, email, password:encryptedPass});
        }
        // @ts-ignore
        res.status(201).json(newUser);
    }
    catch(err){
        if(err instanceof Error){
            res.status(400).json({message: err.message});
        } else if (err instanceof ValidationError){
            res.status(400).json({message: err.message});
        } else {
            res.status(500).json({message: "Something went wrong"});
        }
    }
}