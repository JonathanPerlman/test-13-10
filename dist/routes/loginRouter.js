"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loginController_1 = require("../controllers/loginController");
const loginRouter = (0, express_1.Router)();
loginRouter.post("/login", loginController_1.login);
exports.default = loginRouter;
