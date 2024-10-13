import { Router } from "express";
import { registerTeacher, addGrade } from "../controllers/teacherController";
import { isTeacher } from "../middleware/auteMiddleWare";

const teacherRouter = Router();



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
teacherRouter.post("/register", registerTeacher);  
teacherRouter.post("/addGrade", isTeacher, addGrade);  
// teacherRouter.get("/", getTeachers); 

export default teacherRouter;

