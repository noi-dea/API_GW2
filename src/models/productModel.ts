import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    hitPoints: {
      type: Number,
      required: true,
    },
    abilities: {
      type: [{
        name: String,
        cost: Number,
        damage: String,
      }],
    },
    imageURL: {
      type: String,
      required: false,
    },
    types: [{ type: mongoose.Schema.Types.ObjectId, ref: "Type" }],
    price: {
      type: Number,
      required: true,
    },
    rarity: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rarity",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model("Product", productSchema);
