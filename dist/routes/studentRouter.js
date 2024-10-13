"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const studentController_js_1 = require("../controllers/studentController.js");
const studentRouter = (0, express_1.Router)();
/**
 * @swagger
 * /students/register:
 *  post:
 *      summary: register student
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *                          className:
 *                              type: string
 *
 *
 *      responses:
 *          201:
 *              description: register user
 *
 */
studentRouter.post("/register", studentController_js_1.registerStudent);
// studentRouter.get("/", getStudents); 
exports.default = studentRouter;
