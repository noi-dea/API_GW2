import mongoose from "mongoose";

const raritySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Rarity = mongoose.model("Rarity", raritySchema);
