"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.meetingRoomRounter = void 0;
const express_1 = require("express");
const MeetingRoomController_1 = __importDefault(require("../controllers/MeetingRoomController"));
const auth_1 = require("./middlewares/auth");
const meetingRoomRounter = express_1.Router();
exports.meetingRoomRounter = meetingRoomRounter;
const meetingRoomController = new MeetingRoomController_1.default();
meetingRoomRounter.post('/meeting', [auth_1.isActiveMiddleware, auth_1.jwtMiddleware], (request, response) => {
    return meetingRoomController.create(request, response);
});
meetingRoomRounter.get('/meeting', auth_1.jwtMiddleware, (request, response) => {
    return meetingRoomController.index(request, response);
});
meetingRoomRounter.delete('/meeting/:meetingId', [auth_1.isActiveMiddleware, auth_1.jwtMiddleware], (request, response) => {
    return meetingRoomController.delete(request, response);
});
meetingRoomRounter.put('/meeting/:meetingId', [auth_1.isActiveMiddleware, auth_1.jwtMiddleware], (request, response) => {
    return meetingRoomController.update(request, response);
});
