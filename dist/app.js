"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
// import userRouter from "./routes/studentRouter";
const errorHandler_1 = require("./middleware/errorHandler");
const db_1 = __importDefault(require("./config/db"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("./swagger");
const teacherRouter_1 = __importDefault(require("./routes/teacherRouter"));
const studentRouter_1 = __importDefault(require("./routes/studentRouter"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware
app.use(express_1.default.json());
app.use('/swagger', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerSpec));
(0, db_1.default)();
// Routes
app.use("/teachers", teacherRouter_1.default);
;
app.use("/students", studentRouter_1.default);
;
// Error handling middleware
app.use(errorHandler_1.errorHandler);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
exports.default = app;
