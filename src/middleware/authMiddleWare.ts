import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
const { JWT_SECRET } = process.env;
import { User } from "../models/userModel";

export const isAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(400).json({ message: "Unauthorized" });
      return;
    }
    if (!JWT_SECRET) {
      console.error("Error: JWT_SECRET is missing in .env");
      res.status(500).json({ message: "Internal server error" });
      return;
    }
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      console.log("Token verified:", decoded);
      //   @ts-ignore
      (req as any).user = decoded;
      next();
    } catch (err) {
      console.error("Invalid or expired token:", err);
      res.status(401).json({ message: "Invalid or expired token" });
      return;
    }
  } catch (err) {
    console.error("Authentication Error:", err);
    res.status(400).json({ message: "Bad Request - Authentication failed" });
    return;
  }
};

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // @ts-ignore
    const userFromToken = req.user;
    if (!userFromToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(userFromToken._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.isVerified) {
      return res.status(403).json({ message: "Email not verified" });
    }

    if (user.role !== "admin") {
      return res.status(403).json({ message: "Access denied - Admins only" });
    }

    next();
  } catch (err) {
    console.error("isAdmin middleware error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
