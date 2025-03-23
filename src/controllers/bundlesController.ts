import { Request, Response } from "express";
import { Bundle } from "../models/bundlesModel";
import { Error as MongooseError } from "mongoose";
const { ValidationError } = MongooseError;
// @ts-ignore No typings package available for following package
import FuzzyMatching from "fuzzy-matching";

const matchType = new FuzzyMatching(["box", "booster", "booster-bundle", "etb"]);
const matchSeries = new FuzzyMatching(["Black & White", "Scarlet & Violet", "Sun & Moon", "Sword & Shield", "XY"]);

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
        const bundles = await Bundle.findOne({_id:id});
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
        const spellCheckedTypes = typesArr?.map((type)=>matchType.get(type).value);
        console.log(spellCheckedTypes);
        const seriesArr = series?.split(",")
        const spellCheckedSeries = seriesArr?.map((series)=>matchSeries.get(series).value);
        const bundles = await Bundle.find();
        // --
        console.log(spellCheckedSeries);
        const response = bundles.filter((bundle)=>{
           const containsType =  typesArr == null || typesArr == undefined
                ? true
                // @ts-ignore
                : spellCheckedTypes.includes(bundle.type);
            const containsSeries = seriesArr == null || seriesArr == undefined 
                ? true
                // @ts-ignore
                : spellCheckedSeries.includes(bundle.series);
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

// Add a new bundle to the database
export const addBundle = async (req:Request, res:Response)=>{
    try{
        const {name, type, series, img, price} = req.body;
        if (!name || !type || !series || !img || !price){
            throw new Error("Fill in all fields");
        }
        const bundle = await Bundle.create({name, type, series, img, price});
        res.status(201).json(bundle);
    }
    catch(err){
        err instanceof ValidationError
            ? res.status(400).json({message: err.message})
            : err instanceof Error
                ? res.status(500).json({message: err.message})
                : res.status(500).json({message: "Something went wrong"});
    }
}


// Update the details of an existing bundle in the database
export const updateBundle = async (req:Request, res:Response)=>{
    try{
        const {id} = req.params;
        const {name, type, series, img, price} = req.body;
        const bundle = await Bundle.findByIdAndUpdate(id, {
            name, type, series, img, price
        });
        res.status(200).json({message:"Success", data:bundle});
        if (!bundle){
            throw new Error("No valid bundle found");
        }
    }
    catch(err){
        err instanceof ValidationError
            ? res.status(400).json({message: err.message})
            : err instanceof Error
                ? res.status(500).json({message: err.message})
                : res.status(500).json({message: "Something went wrong"});
    }
}