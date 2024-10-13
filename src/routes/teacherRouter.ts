import { Router } from "express";
import { registerTeacher } from "../controllers/teacherController";

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
// teacherRouter.get("/", getTeachers); 

export default teacherRouter;

