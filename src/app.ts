import express from "express";
import dotenv from "dotenv";
import postRouter from "./routes/teacherRouter";
// import userRouter from "./routes/studentRouter";
import { errorHandler } from "./middleware/errorHandler";
import connectDB from "./config/db";
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from "./swagger";
import teacherRouter from "./routes/teacherRouter"
import studentRouter from "./routes/studentRouter"
import loginRouter from "./routes/loginRouter"
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cookieParser());

// Middleware
app.use(express.json());
app.use('/swagger',swaggerUi.serve, swaggerUi.setup(swaggerSpec));
connectDB();

// Routes
app.use("/teachers", teacherRouter);;
app.use("/students", studentRouter);;
app.use("/", loginRouter);;


// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
