import { Request, Response } from "express";
import { Teacher } from "../models/teacherModel";
import { Student } from "../models/studentModel";
import { Classroom } from "../models/classModel";
import jwt from 'jsonwebtoken';

import { Types } from "mongoose";

export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    try {
        const user = await findUserByEmail(email);
        if (!user) {
         res.status(404).json({ error: "User not found" });
            return;
        }
        if (!isPasswordValid(user, password)) {
             res.status(401).json({ error: "Invalid password" });
            return;
        }
        const token = createToken(user);
        res.cookie("token", token, { maxAge: 600000 });
        res.status(200).json({ token, success: true });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error || "An error occurred" });
    }
};

        






const findUserByEmail = async (email: string) => {
    return await Student.findOne({ email }) || await Teacher.findOne({ email });
};

const isPasswordValid = (user: any, password: string) => {
    return user.password === password;
};

const createToken = (user: any) => {
    return jwt.sign({ _id: user._id, email: user.email, roll: user.roll }, process.env.SECRET_KEY as string, { expiresIn: "1h" });
};




