import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    avatar: {
      type: String,
      required: false,
      default:
        "https://i.pinimg.com/474x/72/48/77/724877d7438cd53dbe791b52019c5fe3.jpg",
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    wishlist: {
      type: {
        Array: mongoose.Schema.Types.ObjectId,
      },
      ref: "Product",
    },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: { type: String },
    resetToken: { type: String },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
