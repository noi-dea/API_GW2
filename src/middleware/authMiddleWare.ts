import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
const {JWT_SECRET} = process.env;

export const isAuth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  if(!token){
    res.status(400).json({message: "Unauthorized"});
    return;
  }
  if (!JWT_SECRET){
    throw new Error("Internal error");
  }
  const user = jwt.verify(token, JWT_SECRET);
  req.user = user;
  next();
};