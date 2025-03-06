import mongoose from "mongoose";

const typeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    img: {
        type: String,
        required: true,
        trim: true
    }
})

export const Type = mongoose.model("Type", typeSchema);