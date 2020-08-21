"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleService = void 0;
const Schedule_1 = __importDefault(require("../../models/Schedule"));
class ScheduleService {
    async findByRoomId(id) {
        const schedules = Schedule_1.default.find({
            roomId: id
        });
        return schedules;
    }
    async saveSchedule(weekDay, from, to, roomId, type) {
        const schedule = await Schedule_1.default.create({ weekDay, from, to, roomId, type });
        return schedule;
    }
    async removeSchedule(id) {
        await Schedule_1.default.remove({ _id: id });
    }
}
exports.ScheduleService = ScheduleService;
