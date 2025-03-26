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
import bundleRoutes from "./routes/bundleRoutes";
import transactionRoutes from "./routes/transactionRoutes";
import { helloMiddleware } from "./middleware/exampleMiddleware";
import mongoose from "mongoose";
import { isAuth, isAdmin } from "./middleware/authMiddleWare";
import { verificationEmail } from "./controllers/authController";
import { renderDashboard } from "./controllers/productController";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import { specs } from "./swagger";
import multer from "multer";
import path from "path";
import {v2 as cloudinary} from "cloudinary";
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } from "./utils/env";
import { Request, Response } from "express";

// Variables
const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", "views");
// Serve static files like CSS and JS
app.use(express.static("public"));

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET
})

// MULTER-CLOUDINARY-VERSION
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'profileAcc',
  } as any,
});

const upload = multer({storage});

// route
app.post("/upload", upload.single("image"), (req:Request, res:Response)=>{
  try{
    // check if there's a file selected
    if (!req.file){
      res.status(400).send("No file uploaded");
      return;
    }
    console.log(req.file);
    const base_url = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/`;
    const trans = "c_thumb,g_face,h_200,w_200/r_max/f_auto/";
    const end = req.file.filename + path.extname(req.file.originalname);
    // res.end();

    // Show response page
    // const imgURL = `/uploads/${req.file.filename}`;
    // console.log(imgURL);
    res.status(200).send(`
      <h1>Image uploaded successfully</h1>
      <img src=${base_url + trans + end} />
      `)
  }
  catch(err){
    err instanceof Error
      ? res.status(500).json({message: err.message})
      : res.status(500).json({message: "Something went wrong"});
  }
})

// Routes
app.get("/api/login/verify/:token", verificationEmail);
app.use("/api", helloMiddleware, userRoutes);
app.use("/api", helloMiddleware, productRoutes);
app.use("/api", helloMiddleware, typeRoutes);
app.use("/api", helloMiddleware, rarityRoutes);
app.use("/api", helloMiddleware, bundleRoutes);
app.use("/api", helloMiddleware, authRoutes);
app.use("/api", isAuth, userRoutes);
app.use("/api", isAuth, setterRoutes);
app.use("/api", isAuth, transactionRoutes);
app.get("/login", (req, res) => res.render("login"));
app.get("/register", (req, res) => res.render("register"));
app.get("/dashboard", isAuth, isAdmin, renderDashboard);
// Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

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
