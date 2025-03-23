import mongoose from "mongoose"


export type RarityType = {
    _id: mongoose.Schema.Types.ObjectId,
    name: string
}

export type RarityQueryType ={
    rarities: string
}

export type ProductType = {
    _id: mongoose.Schema.Types.ObjectId,
    name: string,
    hitPoints: number,
    abilities: [{name:string, cost:number, damage:number}],
    imageURL:string,
    rarity: mongoose.Schema.Types.ObjectId
}

export type BundleType = {
    _id:mongoose.Schema.Types.ObjectId,
    name:string,
    type:string,
    series:string,
    img:string,
    price:number
}