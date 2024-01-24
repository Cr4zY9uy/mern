import Express from "express";
import router from "./router/auth_router.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors"
const app = Express();
dotenv.config();

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/", router);

mongoose.connect(process.env.URL_DB)
    .then(() => {
        console.log("Connected to the database");
    })
    .catch((err) => {
        console.error("Error connecting to the database:", err.message);
    });

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
