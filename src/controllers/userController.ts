import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

const MAX_AGE = 9 * 24 * 60 * 60;

const getSingleUserOrAll = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        if (id) {
            const user = await User.findById({ _id: id });
            return res.status(200).json(user);
        }
        const allUsers = await User.find();
        res.status(200).json(allUsers)
    } catch (err) {
        console.error(err);
        res.status(400).json(err);
    }
}

const signUp = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        const user_exists = await User.exists({ username });
        if (user_exists) {
            return res.status(400).json('User already exists in db!!!');
        }
        const user = await User.create({ username, password });
        user.save();
        const token = jwt.sign(user._id, process.env.JWT_SECRET!, {expiresIn: MAX_AGE});
        res.cookie('token', token);
        return res.status(201).json(user.username);
    } catch (err) {
        console.error(err);
        return res.status(400).json(err);
    }
}

export { getSingleUserOrAll, signUp }