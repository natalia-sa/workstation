"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const UserController_1 = __importDefault(require("../controllers/UserController"));
const auth_1 = require("./middlewares/auth");
const userRouter = express_1.Router();
exports.userRouter = userRouter;
const userController = new UserController_1.default();
userRouter.post('/signup', (request, response) => {
    return userController.create(request, response);
});
userRouter.get('/confirm', (request, response) => {
    return userController.confirmAccount(request, response);
});
userRouter.get('/users', auth_1.jwtMiddleware, (request, response) => {
    return userController.index(request, response);
});
userRouter.put('/users/:userId', [auth_1.isActiveMiddleware, auth_1.jwtMiddleware], (request, response) => {
    return userController.update(request, response);
});
userRouter.delete('/users/:userId', [auth_1.isActiveMiddleware, auth_1.jwtMiddleware], (request, response) => {
    return userController.delete(request, response);
});
