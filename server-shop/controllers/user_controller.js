import bcrypt from "bcryptjs"
import user_model from "../models/user.js";
import jwt from "jsonwebtoken"
import randToken from "rand-token"
export const login = async (req, res) => {
    try {

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
}
export const register = async (req, res) => {
    try {
        const data = req.body;
        const salt = await bcrypt.genSalt(12);
        const hashed = await bcrypt.hash(data.password, salt)
        console.log(hashed)
        data.password = hashed;
        const user = await user_model.create(data);
        if (user) {
            return res.status(201).json({ message: "Register successfully" });
        }
        else {
            return res.status(400).json({ error: error.message });
        }
        // await user.save();
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}