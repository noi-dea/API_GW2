// Imports
import "dotenv/config";
import cors from "cors";
import express from "express";
import { notFound } from "./controllers/notFoundController";
import setterRoutes from "./routes/setterRoutes";
import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";
import authRoutes from "./routes/authRoutes";
import typeRoutes from "./routes/typeRoutes";
import rarityRoutes from "./routes/rarityRoutes";
import transactionRoutes from "./routes/transactionRoutes";
import { helloMiddleware } from "./middleware/exampleMiddleware";
import mongoose from "mongoose";
import { isAuth } from "./middleware/authMiddleWare";
import cookieParser from 'cookie-parser';


// Variables
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api", helloMiddleware, userRoutes);
app.use("/api", helloMiddleware, productRoutes);
app.use("/api", helloMiddleware, typeRoutes);
app.use("/api", helloMiddleware, rarityRoutes);
app.use("/api", helloMiddleware, authRoutes);
app.use("/api", isAuth, setterRoutes);
app.use("/api", isAuth, transactionRoutes);
app.all("*", notFound);

// Database connection
try {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined");
  }
  await mongoose.connect(process.env.MONGO_URI!);
  console.log("Database connection OK");
} catch (err) {
  console.error(err);
  process.exit(1);
}

// Server Listening
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}! 🚀`);
});
