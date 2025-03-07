// Imports
import "dotenv/config";
import cors from "cors";
import express from "express";
import { notFound } from "./controllers/notFoundController";
import testRoutes from "./routes/exampleRoutes";
import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";
import { helloMiddleware } from "./middleware/exampleMiddleware";
import mongoose from "mongoose";

// Variables
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", helloMiddleware, testRoutes);
app.use("/api", helloMiddleware, userRoutes);
app.use("/api", helloMiddleware, productRoutes);
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
