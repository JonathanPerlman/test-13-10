import { Router } from "express";
import { registerStudent, } from "../controllers/studentController.js";

const studentRouter = Router();


studentRouter.post("/register", registerStudent); 
// studentRouter.get("/", getStudents); 

export default studentRouter;
