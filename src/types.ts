import mongoose from "mongoose"


export type RarityType = {
    _id: mongoose.Schema.Types.ObjectId,
    name: string
}