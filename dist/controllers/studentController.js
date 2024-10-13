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
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerStudent = void 0;
const studentModel_1 = require("../models/studentModel");
const classModel_1 = require("../models/classModel");
const registerStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { name, email, password, className } = req.body;
        const existingStudent = yield studentModel_1.Student.findOne({ email });
        if ((existingStudent === null || existingStudent === void 0 ? void 0 : existingStudent.email) === email) {
            res.status(400).json({ error: "Student is already registered" });
            return;
        }
        const classroom = yield classModel_1.Classroom.findOne({ name: className });
        if (!classroom) {
            res.status(404).json({ error: "Classroom not found" });
            return;
        }
        const newStudent = new studentModel_1.Student({
            name,
            email,
            password,
            classroom: classroom._id,
            roll: "student",
        });
        yield newStudent.save();
        (_a = classroom.students) === null || _a === void 0 ? void 0 : _a.push(newStudent._id);
        yield classroom.save();
        res.status(201).json({ message: "Student registered successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error || "An error occurred" });
    }
});
exports.registerStudent = registerStudent;
