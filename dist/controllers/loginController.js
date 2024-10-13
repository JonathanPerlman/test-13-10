"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const teacherModel_1 = require("../models/teacherModel");
const studentModel_1 = require("../models/studentModel");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield findUserByEmail(email);
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error || "An error occurred" });
    }
});
exports.login = login;
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield studentModel_1.Student.findOne({ email })) || (yield teacherModel_1.Teacher.findOne({ email }));
});
const isPasswordValid = (user, password) => {
    return user.password === password;
};
const createToken = (user) => {
    return jsonwebtoken_1.default.sign({ _id: user._id, email: user.email, roll: user.roll }, process.env.SECRET_KEY, { expiresIn: "1h" });
};
