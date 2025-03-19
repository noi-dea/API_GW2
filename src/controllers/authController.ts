// imports
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { User } from "../models/userModel";
import { signToken } from "../utils/helper";

// variables
const saltRounds = 10;
const SECRET = process.env.JWT_SECRET;

// functions
// ---- // register
export const register = async (req: Request, res: Response) => {
  try {
    // retrieve fields
    const { name, email, password, role } = req.body;
    // check if all fields are filled in
    if (!name || !email || !password) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const userRole = role === "admin" ? "admin" : "user";
    // encrypt password
    const hashPass = await bcrypt.hash(password, saltRounds);
    // create user
    const response = await User.create({
      name,
      email,
      password: hashPass,
      role: userRole,
    });

    if (!SECRET) {
      throw new Error("Internal error");
    }

    const userResponse = {
      _id: response._id,
      name: response.name,
      email: response.email,
      role: response.role,
    };

    // JWT aanmaken USER - SECRET - EXPIRESIN
    const token = await signToken({
      user: userResponse,
      secret: SECRET,
      expiresIn: "1d",
    });

    // Cookie aanmaken
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    const redirectUrl = userRole === "admin" ? "/dashboard" : "/login";
    res
      .status(201)
      .json({ message: "User created successfully", user: userResponse });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};

// ---- // login
export const login = async (req: Request, res: Response) => {
  try {
    // get login credentials
    const { email, password } = req.body;
    // Debug log
    console.log("Login attempt:", { email });
    // check if all credentials are given
    if (!email || !password) {
      res.status(400).json({ message: "fill in all fields" });
      return;
    }
    // retrieve connected userData
    const user = await User.findOne({ email });
    // check if there's an existing account
    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }
    // Check if passwords match
    const isMatch = await bcrypt.compare(password, user.password);
    // if passwords don't match
    if (!isMatch) {
      res.status(400).json({
        message: "Invalid input, either email or password is incorrect",
      });
      return;
    }

    if (!SECRET) {
      throw new Error("Internall Error");
    }

    // create token
    const tokenUser = {
      _id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    const token = await signToken({
      user: tokenUser,
      secret: SECRET,
      expiresIn: "1d",
    });

    //  create cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    // Redirect based on role
    const redirectUrl = user.role === "admin" ? "/dashboard" : "/login";
    res
      .status(200)
      .json({ message: "Login successfull", redirect: redirectUrl });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};

// ---- // logout (overwrite cookie so it ends immediately)
export const logout = async (req: Request, res: Response) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: "none",
      maxAge: 1,
    });
    res.status(200).json({ message: "Logout successfull" });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};
