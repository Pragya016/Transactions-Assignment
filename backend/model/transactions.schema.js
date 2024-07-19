import mongoose from "mongoose";

const transactionsSchema = new mongoose.Schema({
    id: String,
    title: String,
    description: String,
    price: Number,
    dateOfSale: Date,
    image:String,
    sold: Boolean,
    category: String,
})

export const Transaction = mongoose.model('Transaction', transactionsSchema);
