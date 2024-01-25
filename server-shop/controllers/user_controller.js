import bcrypt from "bcryptjs"
import user_model from "../models/user_model.js";
import jwt from "jsonwebtoken"
import randToken from "rand-token"
import { validationResult } from "express-validator";


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
        res.cookie("refresh_token", refreshToken, { httpOnly: true, secure: true, sameSite: "none", maxAge: 60 * 60 * 1000 * 24 });
        res.cookie("access_token", accessToken, { httpOnly: true, secure: true, sameSite: "none", maxAge: 60 * 60 * 1000 * 24 });
        return res.status(200).json({
            user: {
                username: user.username,
                name: user.name
            }
        })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
export const register = async (req, res) => {
    
    try {
        const data = req.body;
        const checkUsername = await user_model.findOne({ username: data.username });
        if (checkUsername) {
            return res.status(400).json({ message: "Username existed" });
        }
        const checkname = await user_model.findOne({ name: data.name });
        if (checkname) {
            return res.status(400).json({ message: "Name existed" });
        }
        const salt = await bcrypt.genSalt(12);
        const hashed = await bcrypt.hash(data.password, salt)
        data.password = hashed;
        const user = await user_model.create(data);
        if (user) {
            return res.status(201).json({ message: "Register successfully" });
        }
        else {
            return res.status(400).json({ message: error.message });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
export const logout = async (req, res) => {
    try {
        res.clearCookie("refresh_token")
        res.clearCookie("access_token")
        return res.status(200).json({ message: "Logout successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}