const mongoose = require("mongoose");
const category_schema = new mongoose.Schema({
    category_id: String,
    name: String,
    image: String,
    description: String
},
    {
        timestamps: true
    })
module.exports = mongoose.model("categories", category_schema);