"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MeetingRoom_1 = __importDefault(require("../models/MeetingRoom"));
const MeetingRoomService_1 = require("../services/implementations/MeetingRoomService");
class MeetingRoomController {
    constructor() {
        this.meetingRoomService = new MeetingRoomService_1.MeetingRoomService();
    }
    async update(request, response) {
        const id = await request.params.meetingId;
        const newName = request.body.name;
        const newDescription = request.body.description;
        await this.meetingRoomService.updateMeetingRoom(id, newDescription, newName);
        const meetingRoom = await MeetingRoom_1.default.findOne({ _id: id });
        return response.json(meetingRoom);
    }
    async delete(request, response) {
        const id = await request.params.meetingId;
        await this.meetingRoomService.removeMeetingRoom(id);
        return response.json({ message: "meeting removed with success" });
    }
    async index(request, response) {
        const meetingRooms = await this.meetingRoomService.listAllMeetingRooms();
        return response.json(meetingRooms);
    }
    async create(request, response) {
        const { name, description } = request.body;
        const meetingRoom = await this.meetingRoomService.saveMeetingRoom(name, description);
        return response.json(meetingRoom);
    }
}
exports.default = MeetingRoomController;
