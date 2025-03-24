import { Request, Response } from "express";
import { Product } from "../models/productModel";
import mongoose, { Error as MongooseError } from "mongoose";
const { ValidationError } = MongooseError;
import { Type } from "../models/typeModel";
import { Rarity } from "../models/rarityModel";
import { type RarityType, type RarityQueryType} from "../types";

// Create/add a product into the database
export const addProduct = async (req: Request, res: Response) => {
  try {
    const { name, hitPoints, abilities, imageURL, types, price, rarity } =
      req.body;
    const newProduct = await Product.create({
      name,
      hitPoints,
      abilities,
      imageURL,
      types,
      price,
      rarity,
    });
    res.status(201).json(newProduct);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
    } else if (err instanceof ValidationError) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};

// Get all products
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find().populate("rarity").populate("types");
    res.status(200).json(products);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};

// Get product by ID
export const getProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).populate("rarity").populate("types");
    if (!id) {
      res.status(400).json({
        message: "Please enter an ID",
      });
      return;
    }
    res.status(200).json(product);
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).json({ message: error.message });
    } else if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};

// retrieve the products based on type
export const getProductsByType = async (req: Request, res: Response) => {
  try {
    const { typeName } = req.params;
    const type = await Type.findOne()
      .where("name")
      .equals(typeName.toLocaleLowerCase());
    const products = await Product.find().populate("types").populate("rarity");
    const filteredProducts = products.filter((product) =>
      // @ts-ignore
      product.types.find((el) => el._id.toString() == type._id.toString())
    );
    res.status(200).json(filteredProducts);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message:"Something went wrong"});
    }
  }
};


// Fetch Data for Dashboard
export const renderDashboard = async (req: Request, res: Response) => {
  try {
    const products = await Product.find().populate("types").populate("rarity");
    res.render("dashboard", { products });
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).send("Internal Server Error");
  }
};


// Delete a product
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ message: "Product ID is required" });
      return;
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Invalid product ID format" });
      return;
    }
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting product", error: err });
  }
};

// get products based on rarity  (1 rarity via params)
export const getProductsByRarity = async (req:Request, res:Response)=>{
  try{
    const {rarityName} = req.params;
    const dbRarity:RarityType | null = await Rarity.findOne({name:rarityName});
    const products = await Product.find().populate("rarity").populate("types");
    if(!dbRarity){
      res.status(400).json({message: "Invalid input"});
      return;
    }
    if (!dbRarity._id){
      res.status(500).json({message: "Something went wrong"});
      return;
    }

    console.log("product.rarity._id.toString(): ", products[0].rarity._id.toString());
    console.log("dbRarity._id.toString(): ", dbRarity._id.toString());
    const filteredProducts = products.filter((product)=>product.rarity._id.toString()==dbRarity._id.toString());
    res.status(200).json(filteredProducts);
  }
  catch(err){
    err instanceof Error
      ? res.status(500).json({message: err.message})
      : res.status(500).json({message: "Something went wrong"});
  }
}

// Get all products of x rarities
export const getProductsByRarityQuery = async (req:Request, res:Response)=>{
  try{
    // @ts-ignore
    const {rarities}:RarityQueryType = req.query;
    if (!rarities){
      getAllProducts(req, res);
      return;
    }
    const rarityNamesArr = rarities.split(",");
    const products = await Product.find().populate("rarity").populate("types");
    console.log(rarityNamesArr);
    // @ts-ignore
    const matchingProducts = products.filter((product)=>product.rarity).filter((product)=>rarityNamesArr.includes(product.rarity.name));
    res.status(200).json(matchingProducts);


  }
  catch(err){
    err instanceof Error
      ? res.status(500).json({message: err.message})
      : res.status(500).json({message: "Something went wrong"});
  }
} 