"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleRouter = void 0;
const express_1 = require("express");
const ScheduleController_1 = __importDefault(require("../controllers/ScheduleController"));
const auth_1 = require("./middlewares/auth");
const scheduleRouter = express_1.Router();
exports.scheduleRouter = scheduleRouter;
const scheduleController = new ScheduleController_1.default();
scheduleRouter.post('/schedule', [auth_1.isActiveMiddleware, auth_1.jwtMiddleware], (request, response) => {
    return scheduleController.create(request, response);
});
scheduleRouter.delete('/schedule/:scheduleId', [auth_1.isActiveMiddleware, auth_1.jwtMiddleware], (request, response) => {
    return scheduleController.delete(request, response);
});
scheduleRouter.get('/schedule/:id', auth_1.jwtMiddleware, (request, response) => {
    return scheduleController.index(request, response);
});
