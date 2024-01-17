const express = require("express");
const mongoose = require("mongoose");
const app = express();
const randToken = require("rand-token");
const dotenv = require("dotenv");
const cors = require("cors")
const cookieParser = require("cookie-parser");
const uri_db = 'mongodb+srv://heronakamura123:t0WLjSltwAP0khgB@scart.sggc0u9.mongodb.net/shop';
const category_model = require("./models/category");
const product_model = require("./models/product");
const user_model = require("./models/user");
const order_model = require("./models/order");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const cloudinary = require("./cloudinary");
const { default: uploadImages } = require("./uploadImages");
dotenv.config();
app.listen(process.env.PORT, function () {
    console.log("Server is running");
})
mongoose
    .connect(uri_db)
    .then(() => {
        console.log("Connecting to database...");
    })
    .catch(error => console.log(error));
app.use(cookieParser());
app.use(express.json({ limit: '10MB' }))
app.use(express.urlencoded({ extended: true, limit: "60mb" }));
app.use(cors());
app.get("/", (req, res) => {
    res.send("app runnig");
})
app.post("/category/add", async function (req, res) {
    try {
        const data = req.body;
        // const uploadedImage = await cloudinary.uploader.upload(data.image,
        //     {
        //         upload_preset: 'yqk67lv3',
        //     },
        //     function (error, result) {
        //         if (error) {
        //             console.log(error);
        //         }
        //         console.log(result);
        //     });

        // try {
        //     res.status(200).json(uploadedImage)
        // }
        // catch (err) {
        //     console.log(err);
        // }
        // const formalData = {
        //     category_id: data.category_id,
        //     name: data.name,
        //     image: uploadedImage.public_id + '=' + process.env.CLOUDINARY_NAME,
        //     description: data.description
        // }
        const checkExistId = await category_model.findOne({ category_id: data.category_id });
        if (checkExistId != null) {
            return res.status(400).json({ messsage: "Category id is existed" });
        }
        const checkExistName = await category_model.findOne({ name: data.name });
        if (checkExistName != null) {
            return res.status(400).json({ messsage: "Category name is existed" });
        }
        // console.log('formalData ' + formalData);
        const category = new category_model(data);
        await category.save();
        return res.status(201).json({ message: "Done" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
})
app.get("/category", async function (req, res) {
    try {
        const data = await category_model.find().sort({ createdAt: -1 });
        if (data.length === 0) {
            return res.status(400).json({ message: "No category" });
        }
        else {
            const category_list = data.map((category) => ({
                category_id: category.category_id,
                name: category.name,
                description: category.description
            })
            );
            return res.status(200).json({ category_list });
        }
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
})
app.get("/product/category/:name", async function (req, res) {

    const cateName = req.params.name;
    const encodeCateName = decodeURIComponent(cateName);
    const limit = 9;
    const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;
    const skip = (page - 1) * limit;
    try {
        const dataAll = await product_model.find({ category_name: encodeCateName }).sort({ createdAt: -1 });
        const data = await dataAll.limit(limit).skip(skip);
        if (dataAll.length === 0) {
            return res.status(400).json({ message: "No product" });
        }
        else {
            const total_page = Math.ceil(dataAll.length / limit);
            const product_list = data.map((product) => ({
                product_id: product.product_id,
                title: product.title,
                price: product.price,
                price_promotion: product.price_promotion,
                thumbnail: product.thumbnail,
                status: product.status
            })
            );
            return res.status(200).json({ product_list, total_page: total_page, total_product: dataAll.length, page: page });
        }
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
})

app.get("/category/:id", async function (req, res) {
    try {
        const category_id = req.params.id;
        const data = await category_model.findOne({ category_id: category_id })
        if (data === null) {
            return res.status(400).json({ message: "Category no exists" });
        }
        else {
            const category = {
                category_id: data.category_id,
                name: data.name,
                description: data.description
            };
            return res.status(200).json({ category });
        }
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
})
app.put("/category/edit/:id", async function (req, res) {
    try {
        const category_id = req.params.id;
        const data = req.body;
        const find = await category_model.findOne({ category_id: category_id });
        if (find === null) {
            return res.status(400).json({ message: "Category no exists" });
        }
        else {
            const update_category = await category_model.findOneAndUpdate(
                {
                    category_id: category_id
                },
                {
                    name: data.name,
                    description: data.description
                },
                {
                    new: true
                }
            );
            await update_category.save();
            return res.status(200).json({ update_category });
        }
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
})
app.delete("/category/delete/:id", async function (req, res) {
    try {
        const id = req.params.id;
        const data = await category_model.findOneAndDelete({ category_id: id });
        if (data) {
            return res.status(200).json({ message: "Category deleted successfully" });
        } else {
            return res.status(404).json({ message: "Category not found" });
        }
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
})

app.post("/register", async function (req, res) {
    try {
        const data = req.body;
        const salt = await bcrypt.genSalt(12);
        const hashed = await bcrypt.hash(data.password, salt);
        data.password = hashed;
        const user = new user_model(data);
        await user.save();
        return res.status(201).json({ message: "Register successfully" });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
})

app.post("/login", async function (req, res) {
    try {
        const data = req.body;
        const user = await user_model.findOne({ username: data.username });
        if (!user) {
            return res.status(401).json({ message: "Username not existed" });
        }
        const verify = await bcrypt.compare(data.password, user.password);
        if (!verify) {
            return res.status(401).json({ message: "Password not true" });
        }
        const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
        const dataForAccessToken = {
            username: user.username,
            role: user.role
        };
        const accessToken = jwt.sign(dataForAccessToken, accessTokenSecret, { expiresIn: accessTokenLife });
        if (!accessToken) {
            return res
                .status(401)
                .json({ message: 'Login fail, retry' });
        }
        let refreshToken = randToken.generate(12);
        if (!user.refreshToken) {
            await user_model.findOneAndUpdate({ username: user.username }, { refreshToken: refreshToken })
        }
        else {
            refreshToken = user.refreshToken;
        }
        return res.status(200).json({
            user: {
                username: user.username,
                password: user.password,
                name: user.name
            },
            token: {
                accessToken,
                refreshToken
            }
        })
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
})
app.post('/refresh_token', async (req, res) => {
    const accessToken = req.headers.x_authorization;
    if (!accessToken) {
        return res.status(400).json({ message: "Not allowed" });
    }
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
        return res.status(400).json({ message: "Not allowed" });
    }
    const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    const decoded = await jwt.verify(accessToken, accessTokenSecret, { ignoreExpiration: true });
    if (!decoded) {
        return res.status(400).json({ message: "Not allowed" });
    }
    const username = decoded.payload.username;
    const role = decoded.payload.role;
    role
    const user = await user_model.findOne({ username: username });
    if (!user) {
        return res.status(400).json({ message: "User not exist" });
    }
    if (refreshToken !== user.refreshToken) {
        return res.status(400).json({ message: "Not allowed" });
    }
    const dataForAccessToken = {
        username,
        role
    };
    const accessTokenNew = jwt.sign(dataForAccessToken, accessTokenSecret, { expiresIn: accessTokenLife });
    if (!accessTokenNew) {
        return res
            .status(400).json({ message: "Not allowed" });
    }
    return res.json({
        accessToken,
    });
})
app.get('/set_cookie', async (req, res) => {
    res.cookie('user', true, { maxAge: 1000 * 60 * 60 * 24 * 3, httpOnly: true });
    res.send("cookiee")
})
app.get('/read_cookie', async (req, res) => {
    const data = req.cookies.user;
    res.json(data);
    console.log(data);
})

const checkAuth = async (req, res, next) => {
    const accessToken = req.headers.x_authorization;
    if (!accessToken) {
        return res.status(401).json({ message: "Not allowed" });
    }
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

    const verified = await jwt.verify(
        accessToken,
        accessTokenSecret,
    );
    if (!verified) {
        return res
            .status(401)
            .json({ message: "Not allowed" });
    }

    const user = await user_model.findOne({ username: verified.payload.username })
    req.user = user;
    return next();
};
app.get("/product", async (req, res) => {

    const limit = 9;
    const page = parseInt(req.query.page) ? parseInt(req.query.page) : 0;
    const skip = (page - 1) * limit;
    try {
        const data = await product_model.find().limit(limit).skip(skip).sort({ createdAt: -1 });
        if (data.length === 0) {
            return res.status(400).json({ message: "No product" });
        }
        const product_list = data.map((product) => ({
            product_id: product.product_id,
            title: product.title,
            price: product.price,
            description: product.description,
            qty: product.qty,
            category_name: product.category_name,
            thumbnail: product.thumbnail,
            images: [product.images],
            price_promotion: product.price_promotion,
            status: product.status
        }));
        return res.status(200).json({ product_list });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
})
app.post("/product/add", async (req, res) => {
    const data = req.body;
    try {
        const checkExistId = await product_model.findOne({ product_id: data.product_id });
        if (checkExistId != null) {
            return res.status(400).json({ messsage: "Product id is existed" });
        }
        const checkExistName = await product_model.findOne({ title: data.title });
        if (checkExistName != null) {
            return res.status(400).json({ messsage: "Product title is existed" });
        }
        const product = new product_model(data);
        await product.save();
        return res.status(201).json({ message: "Done" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
})

app.put("/product/edit/:id", async function (req, res) {
    try {
        const product_id = req.params.id;
        const data = req.body;
        const find = await product_model.findOne({ product_id: product_id });
        if (find === null) {
            return res.status(400).json({ message: "Product no exists" });
        }
        else {
            const update_product = await product_model.findOneAndUpdate(
                {
                    product_id: product_id
                },
                {
                    title: title,
                    price: data.price,
                    description: data.description,
                    qty: data.qty,
                    category_name: data.category_name,
                    thumbnail: data.thumbnail,
                    images: [data.images],
                    price_promotion: data.price_promotion,
                    status: data.status
                },
                {
                    new: true
                }
            );
            await update_product.save();
            return res.status(200).json({ update_product });
        }
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
})
app.get("/product", async function (req, res) {
    try {
        const product_id = req.query.id ? req.query.id : "";
        const data = await product_model.findOne({ product_id: product_id })
        if (data === null) {
            return res.status(400).json({ message: "Product no exists" });
        }
        else {
            const product = {
                product_id: product_id,
                title: data.title,
                price: data.price,
                description: data.description,
                qty: data.qty,
                category_name: data.category_name,
                thumbnail: data.thumbnail,
                images: [data.images],
                price_promotion: data.price_promotion,
                status: data.status
            };
            return res.status(200).json({ product });
        }
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
})

app.get("/product", async function (req, res) {
    try {
        const name = req.query.name ? req.query.name : "";
        const data = await product_model.findOne({ title: name })
        if (data === null) {
            return res.status(400).json({ message: "Product no exists" });
        }
        else {
            const product = {
                product_id: data.product_id,
                title: name,
                price: data.price,
                description: data.description,
                qty: data.qty,
                category_name: data.category_name,
                thumbnail: data.thumbnail,
                images: [data.images],
                price_promotion: data.price_promotion,
                status: data.status
            };
            return res.status(200).json({ product });
        }
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
})

app.get("/product/hot", async function (req, res) {
    try {
        const data = await product_model.find({ status: 1 })
        if (data.length === 0) {
            return res.status(400).json({ message: "Product no exists" });
        }
        else {
            const product_list = data.map((product) => ({
                product_id: product.product_id,
                title: product.title,
                price: product.price,
                description: product.description,
                qty: product.qty,
                category_name: product.category_name,
                thumbnail: product.thumbnail,
                images: [product.images],
                price_promotion: product.price_promotion,
                status: product.status
            }
            ))

            return res.status(200).json({ product_list });
        }
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
})
app.delete("/product/delete/:id", async function (req, res) {
    try {
        const id = req.params.id;
        const data = await product_model.findOneAndDelete({ product_id: id });
        if (data) {
            return res.status(200).json({ message: "Product deleted successfully" });
        } else {
            return res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
})

app.get("/order", async (req, res) => {
    const limit = 9;
    const page = parseInt(req.query.page) ? parseInt(req.query.page) : 0;
    const skip = (page - 1) * limit;
    try {
        const data = await order_model.find().limit(limit).skip(skip).sort({ createdAt: -1 });
        if (data.length === 0) {
            return res.status(400).json({ message: "No order" });
        }
        const order_list = data.map((order) => ({
            order_id: order_id,
            first_name: order.first_name,
            last_name: order.last_name,
            phone: order.phone,
            email: order.email,
            address: order.address,
            country: order.country,
            payment_method: order.payment_method,
            shipping_method: order.shipping_method,
            payment_status: order.payment_status,
            shipping_status: order.shipping_status,
            order_status: order.order_status,
            products: [
                {
                    product_id: order.products.product_id,
                    title: order.products.title,
                    price: order.products.price,
                    qty: order.products.qty,
                    thumbnail: order.products.thumbnail,
                    price_promotion: order.products.price_promotion,
                    tax: order.products.tax
                }
            ],
            shipping_cost: order.shipping_cost,
            discount: order.discount,
            other_fee: order.other_fee,
            received: order.received,
            note: order.note
        }));
        return res.status(200).json({ order_list });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
})
app.post("/order/add", async (req, res) => {
    const data = req.body;
    try {
        const checkExistId = await order_model.findOne({ order_id: data.order_id });
        if (checkExistId != null) {
            return res.status(400).json({ messsage: "Order id is existed" });
        }
        const order = new order_model(data);
        await order.save();
        return res.status(201).json({ message: "Done" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
})

app.put("/order/edit/:id", async function (req, res) {
    try {
        const order_id = req.params.id;
        const data = req.body;
        const find = await order_model.findOne({ order_id: order_id });
        if (find === null) {
            return res.status(400).json({ message: "Order no exists" });
        }
        else {
            const update_order = await order_model.findOneAndUpdate(
                {
                    order_id: order_id
                },
                {
                    first_name: data.first_name,
                    last_name: data.last_name,
                    phone: data.phone,
                    email: data.email,
                    address: data.address,
                    country: data.country,
                    payment_method: data.payment_method,
                    shipping_method: data.shipping_method,
                    payment_status: data.payment_status,
                    shipping_status: data.shipping_status,
                    order_status: data.order_status,
                    products: [
                        {
                            product_id: data.products.product_id,
                            title: data.products.title,
                            price: data.products.price,
                            qty: data.products.qty,
                            thumbnail: data.products.thumbnail,
                            price_promotion: data.products.price_promotion,
                            tax: data.products.tax
                        }
                    ],
                    shipping_cost: data.shipping_cost,
                    discount: data.discount,
                    other_fee: data.other_fee,
                    received: data.received,
                    note: data.note
                },
                {
                    new: true
                }
            );
            await update_order.save();
            return res.status(200).json({ update_order });
        }
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
})
app.get("/order/:id", async function (req, res) {
    try {
        const order_id = req.params.id;
        const data = await order_model.findOne({ order_id: order_id })
        if (data === null) {
            return res.status(400).json({ message: "Order no exists" });
        }
        else {
            const order = {
                product_id: product_id,
                first_name: data.first_name,
                last_name: data.last_name,
                phone: data.phone,
                email: data.email,
                address: data.address,
                country: data.country,
                payment_method: data.payment_method,
                shipping_method: data.shipping_method,
                payment_status: data.payment_status,
                shipping_status: data.shipping_status,
                order_status: data.order_status,
                products: [
                    {
                        product_id: data.products.product_id,
                        title: data.products.title,
                        price: data.products.price,
                        qty: data.products.qty,
                        thumbnail: data.products.thumbnail,
                        price_promotion: data.products.price_promotion,
                        tax: data.products.tax
                    }
                ],
                shipping_cost: data.shipping_cost,
                discount: data.discount,
                other_fee: data.other_fee,
                received: data.received,
                note: data.note
            };
            return res.status(200).json({ order });
        }
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
})

app.delete("/product/delete/:id", async function (req, res) {
    try {
        const id = req.params.id;
        const data = await order_model.findOneAndDelete({ order_id: id });
        if (data) {
            return res.status(200).json({ message: "Order deleted successfully" });
        } else {
            return res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
})
