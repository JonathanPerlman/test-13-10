"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const studentController_js_1 = require("../controllers/studentController.js");
const studentRouter = (0, express_1.Router)();
studentRouter.post("/register", studentController_js_1.registerStudent);
// studentRouter.get("/", getStudents); 
exports.default = studentRouter;
