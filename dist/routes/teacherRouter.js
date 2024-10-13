"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const teacherController_1 = require("../controllers/teacherController");
const auteMiddleWare_1 = require("../middleware/auteMiddleWare");
const teacherRouter = (0, express_1.Router)();
/**
 * @swagger
 * /teachers/register:
 *  post:
 *      summary: register teacher
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                             type: string
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
teacherRouter.post("/register", teacherController_1.registerTeacher);
teacherRouter.post("/addGrade", auteMiddleWare_1.isTeacher, teacherController_1.addGrade);
// teacherRouter.get("/", getTeachers); 
exports.default = teacherRouter;
