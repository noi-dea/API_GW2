import mongoose from "mongoose";

const bundleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["booster", "booster-bundle", "box", "etb"],
      required: true
    },
    series: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
  },
  {
    timestamps: true,
  }
);

export const Bundle = mongoose.model("Bundle", bundleSchema);
