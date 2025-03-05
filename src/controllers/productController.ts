import { Request, Response } from "express";
import { Product } from "../models/productModel";
import { Error as MongooseError } from "mongoose";
const { ValidationError } = MongooseError;

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
