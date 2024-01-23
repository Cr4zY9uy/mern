const express = require("express");
const mongoose = require("mongoose");
const app = express();
const randToken = require("rand-token");
const dotenv = require("dotenv");
const cors = require("cors")
const cookieParser = require("cookie-parser");
// const uri_db = 'mongodb+srv://heronakamura123:t0WLjSltwAP0khgB@scart.sggc0u9.mongodb.net/shop';
const { check, validationResult } = require("express-validator");
const uri_db = 'mongodb://127.0.0.1:27017/scart'
const category_model = require("./models/category");
const product_model = require("./models/product");
const user_model = require("./models/user");
const order_model = require("./models/order");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const cloudinary = require("./cloudinary");
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
    const user = await user_model.findOne({ username: verified.username })
    req.user = user;
    return next();
};
app.post("/category/add", checkAuth, async function (req, res) {
    try {
        const data = req.body;
        const checkExistId = await category_model.findOne({ category_id: data.category_id });
        if (checkExistId != null) {
            return res.status(400).json({ messsage: "Category id is existed" });
        }
        const checkExistName = await category_model.findOne({ name: data.name });
        if (checkExistName != null) {
            return res.status(400).json({ messsage: "Category name is existed" });
        }
        const uploadedImage = await cloudinary.uploader.upload(data.image,
            {
                upload_preset: 'yqk67lv3',
            },
            function (error, result) {
                if (error) {
                    return res.status(401).json({ error: error.message });
                }
            });

        data.image = uploadedImage.public_id;
        const category = new category_model(data);
        await category.save();
        return res.status(201).json({ message: "Done" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
})
app.get("/category_paginate", async function (req, res) {
    const limit = 6;
    const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;
    const skip = (page - 1) * limit;
    try {
        const dataAll = await category_model.find().sort({ createdAt: -1 });
        const data = dataAll.slice(skip, skip + limit);
        if (data.length === 0) {
            return res.status(400).json({ message: "No category" });
        }
        const total_page = Math.ceil(dataAll.length / limit);
        if (data.length === 0) {
            return res.status(400).json({ message: "No category" });
        }
        else {
            const category_list = data.map((category) => ({
                category_id: category.category_id,
                name: category.name,
                description: category.description,
                image: category.image
            })
            );
            return res.status(200).json({ category_list, total_page: total_page, total_product: dataAll.length, page: page });
        }
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
})
app.get("/category", async function (req, res) {

    try {
        const data = await category_model.find().sort({ createdAt: -1 });
        if (data.length === 0) {
            return res.status(400).json({ message: "No category" });
        }
        if (data.length === 0) {
            return res.status(400).json({ message: "No category" });
        }
        else {
            const category_list = data.map((category) => ({
                category_id: category.category_id,
                name: category.name,
                description: category.description,
                image: category.image
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
    const limit = 9;
    const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;
    const skip = (page - 1) * limit;
    try {
        const dataAll = await product_model.find({ category_name: cateName }).sort({ createdAt: -1 });
        const data = dataAll.slice(skip, skip + limit);
        if (dataAll.length === 0) {
            return res.status(400).json({ message: "No product" });
        }
        else {
            const total_page = Math.ceil(dataAll.length / limit);
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
                description: data.description,
                image: data.image
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
            if (data.image !== "") {
                const uploadedImage = await cloudinary.uploader.upload(data.image,
                    {
                        upload_preset: 'yqk67lv3',
                    },
                    function (error, result) {
                        if (error) {
                            console.log(error.message)
                        }
                    });

                const update_category = await category_model.findOneAndUpdate(
                    {
                        category_id: category_id
                    },
                    {
                        name: data.name,
                        description: data.description,
                        image: uploadedImage.public_id
                    },
                    {
                        new: true
                    }
                );
                await update_category.save();
                return res.status(200).json({ update_category });
            }
            else {
                const update_category = await category_model.findOneAndUpdate(
                    {
                        category_id: category_id
                    },
                    {
                        name: data.name,
                        description: data.description,
                        image: find.image
                    },
                    {
                        new: true
                    }
                );
                await update_category.save();
                return res.status(200).json({ update_category });
            }

        }
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
})
app.delete("/category/delete/:id", checkAuth, async function (req, res) {
    try {
        const id = req.params.id;
        const data = await category_model.findOneAndDelete({ category_id: id });
        if (data !== null) {
            return res.status(200).json({ message: "Category deleted successfully" });
        } else {
            return res.status(404).json({ message: "Category not found" });
        }
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
})
const registerValidator = () => {
    return [
        check("email", "Vui long nhap email").not().isEmpty(),
        check("email", "Email phai dung dinh dang").isEmail(),
        check("password", "Password tu 6 ky tu").isLength({ min: 6 }),
        check("name", "Name khong duoc de trong").not().isEmpty()
    ];
};
app.post("/register", registerValidator, async function (req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array().map(error => error.msg) });
        }
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
const loginValidator = () => {
    return [
        check("username", "Vui long nhap email").not().isEmpty(),
        check("password", "Password tu 6 ky tu").isLength({ min: 6 })
    ]
}

app.post("/login", loginValidator, async function (req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array().map(error => error.msg) });
        }
        const data = req.body;
        const user = await user_model.findOne({ username: data.username });
        if (!user) {
            return res.status(400).json({ message: "Username not existed" });
        }
        const verify = await bcrypt.compare(data.password, user.password);
        if (!verify) {
            return res.status(400).json({ message: "Password not true" });
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
                .status(400)
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
                name: user.name,
            },
            jwt: {
                access_token: accessToken,
                refresh_token: refreshToken
            }
        })
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
})
app.post('/refresh_token', async (req, res) => {
    console.log(req.headers.x_authorization, req.body);
    const accessToken = req.headers.x_authorization;
    if (!accessToken) {
        return res.status(400).json({ message: "Access token not available" });
    }
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
        return res.status(400).json({ message: "refresh token not available" });
    }
    const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    const decoded = await jwt.verify(accessToken, accessTokenSecret, { ignoreExpiration: true });
    if (!decoded) {
        return res.status(400).json({ message: "Not available" });
    }
    const username = decoded.username;
    const role = decoded.role;
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
    res.status(403).send("Forbidden");
})
// app.get('/read_cookie', async (req, res) => {
//     const data = req.cookies.user;
//     res.json(data);
//     console.log(data);
// })

app.get("/product_paginate", async (req, res) => {

    const limit = 9;
    const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;
    const skip = (page - 1) * limit;
    try {
        const dataAll = await product_model.find().sort({ createdAt: -1 });
        const data = dataAll.slice(skip, skip + limit);
        if (data.length === 0) {
            return res.status(400).json({ message: "No product" });
        }
        const total_page = Math.ceil(dataAll.length / limit);
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
        return res.status(200).json({ product_list, total_page: total_page, total_product: dataAll.length, page: page });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
})


app.post("/product/add", checkAuth, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array().map(error => error.msg) });
    }
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
        const uploadedImage = await cloudinary.uploader.upload(data.image,
            {
                upload_preset: 'yqk67lv3',
            },
            function (error, result) {
                if (error) {
                    return res.status(401).json({ error: error.message });
                }
            });
        data.thumbnail = uploadedImage.public_id;
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
            const uploadedImage = await cloudinary.uploader.upload(data.image,
                {
                    upload_preset: 'yqk67lv3',
                },
                function (error, result) {
                    if (error) {
                        return res.status(401).json({ error: error.message });
                    }
                });
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
                    thumbnail: uploadedImage.public_id,
                    images: data.images,
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
app.get("/product/detail/:id", async function (req, res) {
    try {
        const product_id = req.params.id;
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
                images: data.images,
                price_promotion: data.price_promotion,
                status: data.status
            };
            return res.status(200).json({ product });
        }
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
})
app.get("/product_by_id/:id", async function (req, res) {
    const limit = 9;
    const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;
    const skip = (page - 1) * limit;
    const product_id = req.params.id ? req.params.id : "";
    const encodeId = decodeURIComponent(product_id);
    try {
        const dataAll = await product_model.find({ product_id: { $regex: new RegExp(encodeId, 'i') } }).sort({ createdAt: -1 });
        const data = dataAll.slice(skip, skip + limit);
        const total_page = Math.ceil(dataAll.length / limit);
        if (data === null) {
            return res.status(400).json({ message: "Product no exists" });
        }
        else {
            const product = data.map((item) => ({
                product_id: item.product_id,
                title: item.title,
                price: item.price,
                description: item.description,
                qty: item.qty,
                category_name: item.category_name,
                thumbnail: item.thumbnail,
                images: item.images,
                price_promotion: item.price_promotion,
                status: item.status
            }));
            return res.status(200).json({ product, total_page: total_page, total_product: dataAll.length, page: page });
        }
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
})

app.get("/product_by_name/:name", async function (req, res) {
    const limit = 9;
    const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;
    const skip = (page - 1) * limit;
    const name = req.params.name ? req.params.name : "";
    const encodeTitle = decodeURIComponent(name);
    try {
        const dataAll = await product_model.find({ title: { $regex: new RegExp(encodeTitle, 'i') } }).sort({ createdAt: -1 });
        const data = dataAll.slice(skip, skip + limit);
        const total_page = Math.ceil(dataAll.length / limit);
        if (data === null) {
            return res.status(400).json({ message: "Product no exists" });
        }
        else {
            const product = data.map((item) => ({
                product_id: item.product_id,
                title: item.title,
                price: item.price,
                description: item.description,
                qty: item.qty,
                category_name: item.category_name,
                thumbnail: item.thumbnail,
                images: item.images,
                price_promotion: item.price_promotion,
                status: item.status
            }));
            return res.status(200).json({ product, total_page: total_page, total_product: dataAll.length, page: page });
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
app.delete("/product/delete/:id", checkAuth, async function (req, res) {
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

app.get("/order_paginate", async (req, res) => {
    const limit = 9;
    const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;
    const skip = (page - 1) * limit;
    try {
        const dataAll = await order_model.find().sort({ createdAt: -1 });
        const data = dataAll.slice(skip, skip + limit);
        if (data.length === 0) {
            return res.status(400).json({ message: "No order" });
        }
        const total_page = Math.ceil(dataAll.length / limit);
        const order_list = data.map((order) => ({
            order_id: order.order_id,
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
            products: order.products,
            shipping_cost: order.shipping_cost,
            discount: order.discount,
            other_fee: order.other_fee,
            received: order.received,
            balance: order.balance,
            note: order.note,
            createdAt: order.createdAt
        }));
        return res.status(200).json({ order_list, total_page: total_page, total_order: dataAll.length, page: page });
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
                    payment_method: data.payment_method,
                    shipping_method: data.shipping_method,
                    payment_status: data.payment_status,
                    shipping_status: data.shipping_status,
                    order_status: data.order_status,
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
                order_id: order_id,
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
                products: data.products,
                shipping_cost: data.shipping_cost,
                discount: data.discount,
                other_fee: data.other_fee,
                received: data.received,
                note: data.note,
                balance: data.balance,
                createdAt: data.createdAt
            };
            return res.status(200).json({ order });
        }
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
})

app.delete("/order/delete/:id", checkAuth, async function (req, res) {
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
app.delete("/order/delete_product/:order_id", checkAuth, async function (req, res) {
    try {
        const order_id = req.params.order_id;
        const product_id = req.query.product_id;

        const data = await order_model.findOneAndUpdate(
            { order_id: order_id },
            { $pull: { products: { product_id: product_id } } },
            { new: true }
        );

        if (data) {
            return res.status(200).json({ message: "Product removed from order successfully", order: data });
        } else {
            return res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

app.delete("/product/delete_all", checkAuth, async function (req, res) {
    try {
        const data = await product_model.deleteMany({ _id: { $ne: null } });
        if (data) {
            return res.status(200).json({ message: "Product deleted successfully" });
        } else {
            return res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
})
app.delete("/category/delete_all", checkAuth, async function (req, res) {
    try {
        const data = await category_model.deleteMany({ "category_id": { $exists: true } });
        if (data) {
            return res.status(200).json({ message: "Category deleted successfully" });
        } else {
            return res.status(404).json({ message: "Category not found" });
        }
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
})
app.delete("/order/delete_all", checkAuth, async function (req, res) {
    try {
        const data = await order_model.deleteMany({ _id: { $ne: null } });
        if (data) {
            return res.status(200).json({ message: "Order deleted successfully" });
        } else {
            return res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
})