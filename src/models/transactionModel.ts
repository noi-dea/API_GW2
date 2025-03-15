import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    buyer:{
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    products:{
        type: [mongoose.Types.ObjectId],
        ref: "Product"
    },
    price:{
        type: Number,
        required: true
    },
    date:{
        type: Date,
        required: true
    }
});

export const Transaction = mongoose.model("Transaction", transactionSchema);