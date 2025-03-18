import { Request, Response } from "express";
import { Rarity } from "../models/rarityModel";

// get all rarities
export const getRarities = async (req:Request, res:Response)=>{
    try{
        const rarities = await Rarity.find();
        res.status(200).json(rarities);
    }
    catch(err){
        err instanceof Error
            ? res.status(500).json({message: err.message})
            : res.status(500).json({message: "Something went wrong"});
    }
}