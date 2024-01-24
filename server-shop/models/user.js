import mongoose from "mongoose";
const user_schema = new mongoose.Schema({
    username: String,
    password: String,
    role: {
        type: Number,
        enum: [0, 1],
        default: 0
    },
    name: String,
    refreshToken: String,
},
    {
        timestamps: true
    })
export default mongoose.model("users", user_schema);

