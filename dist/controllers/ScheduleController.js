"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ConvertHoursToMinutes_1 = __importDefault(require("../utils/ConvertHoursToMinutes"));
const ScheduleService_1 = require("../services/implementations/ScheduleService");
class ScheduleController {
    constructor() {
        this.scheduleService = new ScheduleService_1.ScheduleService();
    }
    async create(request, response) {
        var { weekDay, from, to, roomId, type } = request.body;
        from = ConvertHoursToMinutes_1.default(from);
        to = ConvertHoursToMinutes_1.default(to);
        const schedule = this.scheduleService.saveSchedule(weekDay, from, to, roomId, type);
        return response.json(schedule);
    }
    async delete(request, response) {
        const id = await request.params.scheduleId;
        await this.scheduleService.removeSchedule(id);
        return response.json({ message: "shcedule removed with success" });
    }
    async index(request, response) {
        const { id } = request.params;
        const schedules = await this.scheduleService.findByRoomId(id);
        return response.json(schedules);
    }
}
exports.default = ScheduleController;
