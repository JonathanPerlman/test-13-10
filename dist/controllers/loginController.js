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
    try {
        const { email, password } = req.body;
        const user = email ? yield teacherModel_1.Teacher.findOne({ email }) : yield studentModel_1.Student.findOne({ email });
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        if (user.password !== password) {
            res.status(401).json({ error: "Invalid password" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ _id: user._id, email: user.email }, process.env.SECRET_KEY, { expiresIn: "1h" });
        res.cookie("token", token, { maxAge: 600000 });
        res.status(200).json({ token: token, success: true });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error || "An error occurred" });
    }
});
exports.login = login;
