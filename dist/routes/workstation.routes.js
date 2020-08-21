"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.workstationRouter = void 0;
const express_1 = require("express");
const WorkstationController_1 = __importDefault(require("../controllers/WorkstationController"));
const auth_1 = require("./middlewares/auth");
const workstationRouter = express_1.Router();
exports.workstationRouter = workstationRouter;
const workstationController = new WorkstationController_1.default();
workstationRouter.post('/workstation', [auth_1.isActiveMiddleware, auth_1.jwtMiddleware], (request, response) => {
    return workstationController.create(request, response);
});
workstationRouter.get('/workstation', auth_1.jwtMiddleware, (request, response) => {
    return workstationController.index(request, response);
});
workstationRouter.delete('/workstation/:workstationId', [auth_1.isActiveMiddleware, auth_1.jwtMiddleware], (request, response) => {
    return workstationController.delete(request, response);
});
workstationRouter.put('/workstation/:workstationId', [auth_1.isActiveMiddleware, auth_1.jwtMiddleware], (request, response) => {
    return workstationController.update(request, response);
});
