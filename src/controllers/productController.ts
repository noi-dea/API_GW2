import { Request, Response } from "express";
import { Product } from "../models/productModel";
import { Error as MongooseError } from "mongoose";
const { ValidationError } = MongooseError;
import { Type } from "../models/typeModel";

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
    const products = await Product.find();
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
    const product = await Product.findById(id);
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
    const products = await Product.find().populate("types");
    // @ts-ignore
    const filteredProducts = products.filter((product) =>
      product.types.find((el) => el._id.toString() == type._id.toString())
    );
    res.status(200).json(filteredProducts);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};

// Fetch Data for Dashboard
export const renderDashboard = async (req: Request, res: Response) => {
  try {
    const products = await Product.find().populate("types");
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
      return res.status(400).json({ message: "Product ID is required" });
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting product", error: err });
  }
};
