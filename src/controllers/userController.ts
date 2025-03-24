import { Request, Response } from "express";
import { User } from "../models/userModel";
import { Error as MongooseError } from "mongoose";
const { ValidationError } = MongooseError;
import bcrypt from "bcrypt";

const saltRounds = 10;
// Create/add a user into the database
export const addUser = async (req: Request, res: Response) => {
  try {
    const { name, email, avatar, password } = req.body;
    const encryptedPass = await bcrypt.hash(password, saltRounds);
    const newUser = await User.create({
      name,
      email,
      avatar,
      password: encryptedPass,
      role: "user",
    });
    res.status(201).json(newUser);
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

// Get all users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().populate("address");
    res.status(200).json(users);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};

// Get user with specific ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate("address");
    res.status(200).json(user);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ messsage: "Something went wrong" });
    }
  }
};

export const updateUserRole = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { role } = req.body;

  if (!["admin", "user"].includes(role)) {
    res.status(400).json({ message: "Invalid role" });
    return;
  }

  try {
    const user = await User.findByIdAndUpdate(id, { role }, { new: true });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ message: "User role updated", user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllUsersDashboard = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select("_id name email role").populate("address");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
