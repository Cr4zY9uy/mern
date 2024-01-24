import mongoose from "mongoose";
const product_schema = new mongoose.Schema({
    product_id: String,
    title: String,
    price: Number,
    description: String,
    qty: Number,
    category_name: String,
    thumbnail: String,
    images: [String],
    price_promotion: Number,
    status: Number
}
    ,
    {
        timestamps: true
    })
module.exports = mongoose.model("products", product_schema);