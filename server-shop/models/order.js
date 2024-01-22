const mongoose = require("mongoose");
const order_schema = new mongoose.Schema({
    order_id: String,
    first_name: String,
    last_name: String,
    phone: String,
    email: String,
    address: String,
    country: String,
    payment_method: String,
    shipping_method: String,
    payment_status: String,
    shipping_status: String,
    order_status: String,
    products: [
        {
            product_id: String,
            title: String,
            price: Number,
            quantity: Number,
            thumbnail: String,
            price_promotion: Number,
            tax: Number
        }
    ],
    shipping_cost: Number,
    discount: Number,
    other_fee: Number,
    received: Number,
    note: String
},
    {
        timestamps: true
    })
module.exports = mongoose.model("orders", order_schema);