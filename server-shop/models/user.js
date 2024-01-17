const mongoose = require("mongoose");
const user_schema = new mongoose.Schema({
    username: String,
    password: String,
    role: Number,
    name: String,
    refreshToken: String,
},
    {
        timestamps: true
    })
module.exports = mongoose.model("users", user_schema);