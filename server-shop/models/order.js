import mongoose from "mongoose";
const order_schema = new mongoose.Schema({
    order_id: String,
    first_name: String,
    last_name: String,
    phone: String,
    email: String,
    address: String,
    country: String,
    payment_method: {
        type: String,
        enum: ['Credit card', 'Paypal', 'COD']
    },
    shipping_method: {
        type: String,
        enum: ['Express', 'Free', 'Standard']
    },
    payment_status: {
        type: String,
        enum: ['Unpaid', 'Partial payment', 'Paid', 'Return'],
        default: 'Unpaid'
    },
    shipping_status: {
        type: String,
        enum: ['Not sent', 'Sending', 'Shipping done'],
        default: 'Not sent'
    },
    order_status: {
        type: String,
        enum: ['New', 'Processing', 'Hold', 'Canceled', 'Done', 'Failed'],
        default: 'New'
    },
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
    discount: {
        type: Number,
        default: 0
    },
    other_fee: {
        type: Number,
        default: 0
    },
    received: {
        type: Number,
        default: 0
    },
    balance: {
        type: Number,
        default: 0
    },
    note: String
},
    {
        timestamps: true
    })
module.exports = mongoose.model("orders", order_schema);