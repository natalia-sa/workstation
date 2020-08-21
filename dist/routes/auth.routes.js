"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const AuthController_1 = require("../controllers/AuthController");
const authRouter = express_1.Router();
exports.authRouter = authRouter;
const authController = new AuthController_1.AuthController();
authRouter.post('/auth/authenticate', async (request, response) => {
    return authController.authenticate(request, response);
});
