import { Router } from "express";
import { registerStudent, } from "../controllers/studentController.js";

const studentRouter = Router();

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
studentRouter.post("/register", registerStudent); 
// studentRouter.get("/", getStudents); 

export default studentRouter;
