import { Request, Response } from "express";
import { Bundle } from "../models/bundlesModel";
import { Error as MongooseError } from "mongoose";
const { ValidationError } = MongooseError;

// Function to get all bundles from the database
export const getAllBundles = async(req:Request, res:Response)=>{
    try{
        const bundle = await Bundle.find();
        res.status(200).json(bundle);
    }
    catch(err){
        err instanceof Error
            ? res.status(500).json({message: err.message})
            : res.status(500).json({message: "Something went wrong"});
    }
}

// Function to get a specific bundle by their identifier
export const getBundleById = async(req:Request, res:Response)=>{
    try{
        const {id} = req.params;
        const bundles = await Bundle.find({_id:id});
        res.status(200).json(bundles);
    }
    catch(err){
        err instanceof Error
            ? res.status(500).json({message: err.message})
            : res.status(500).json({message: "Something went wrong"});
    }
}

// Get bundles by varying specifics
export const getBundlesByQuery = async (req:Request, res:Response)=>{
    try{
        const {type, series} = req.query;
        // check if queryparams have been given
        if (!type && !series){
            getAllBundles(req, res);
            return;
        }

        // doesn't really do anything since they'll always be a string but typescript gets annoying without this here
       if (type && typeof(type)!=="string"){
        res.status(500).json({message: "erronous data"});
        return;
       }
       if (series && typeof(series)!=="string"){
        res.status(500).json({message: "erronous data"});
        return;
       }

        const typesArr = type?.split(",")
        const seriesArr = series?.split(",")
        const bundles = await Bundle.find();
        // --
        console.log(seriesArr);
        const response = bundles.filter((bundle)=>{
           const containsType =  typesArr == null || typesArr == undefined
                ? true
                : typesArr.includes(bundle.type);
            const containsSeries = seriesArr == null || seriesArr == undefined 
                ? true
                : seriesArr.includes(bundle.series);
            return containsType && containsSeries
        });
        // --
        res.status(200).json(response);
    }
    catch(err){
        err instanceof Error
            ? res.status(500).json({message: err.message})
            : res.status(500).json({message: "Something went wrong"});
    }
}