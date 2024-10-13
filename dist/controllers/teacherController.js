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
exports.loginTeacher = exports.registerTeacher = void 0;
const teacherModel_1 = require("../models/teacherModel");
const classModel_1 = require("../models/classModel");
const registerTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, className } = req.body;
        const existingTeacher = yield teacherModel_1.Teacher.findOne({ email });
        if ((existingTeacher === null || existingTeacher === void 0 ? void 0 : existingTeacher.email) === email) {
            res.status(400).json({ error: "Teacher already has a classroom assigned" });
            return;
        }
        const existingClassroom = yield classModel_1.Classroom.findOne({ name: className });
        if (existingClassroom) {
            res.status(400).json({ error: "Classroom with this name already exists" });
            return;
        }
        const newClass = new classModel_1.Classroom({ name: className });
        yield newClass.save();
        const newTeacher = new teacherModel_1.Teacher({
            name,
            email,
            password,
            classroom: newClass._id,
        });
        yield newTeacher.save();
        newClass.teacher = newTeacher._id;
        yield newClass.save();
        res.status(201).json({ classId: newClass._id });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
    }
});
exports.registerTeacher = registerTeacher;
const loginTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const teacher = yield teacherModel_1.Teacher.findOne({ email, password });
        if (!teacher) {
            res.status(401).json({ error: "Invalid email or password" });
            return;
        }
        const classroom = yield classModel_1.Classroom.findById(teacher.classroom);
        if (!classroom) {
            res.status(404).json({ error: "Classroom not found" });
            return;
        }
        res.status(200).json({ teacher, classroom });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: error || "An error occurred" });
    }
});
exports.loginTeacher = loginTeacher;
