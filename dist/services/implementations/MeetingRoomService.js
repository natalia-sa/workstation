"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeetingRoomService = void 0;
const MeetingRoom_1 = __importDefault(require("../../models/MeetingRoom"));
class MeetingRoomService {
    async updateMeetingRoom(id, description, name) {
        await MeetingRoom_1.default.update({ "_id": id }, { $set: { "name": name, "description": description } });
    }
    async removeMeetingRoom(id) {
        await MeetingRoom_1.default.remove({ _id: id });
    }
    async listAllMeetingRooms() {
        const meetingRoom = await MeetingRoom_1.default.find();
        return meetingRoom;
    }
    async saveMeetingRoom(name, description) {
        const meetingRoom = await MeetingRoom_1.default.create({
            name, description
        });
        return meetingRoom;
    }
}
exports.MeetingRoomService = MeetingRoomService;
