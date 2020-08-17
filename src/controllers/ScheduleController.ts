import { Request, Response } from "express";
import Schedule from '../models/Schedule';
import ConvertHourToMinutes from '../utils/ConvertHoursToMinutes';
import { IScheduleService } from "../services/IScheduleService";
import { ScheduleService } from "../services/implementations/ScheduleService";

export default class ScheduleController {
    private scheduleService: IScheduleService

    constructor() {
        this.scheduleService = new ScheduleService()
    }

    async create(request: Request, response: Response):Promise<Response> {
        var {weekDay, from , to, roomId, type } = request.body;

        from = ConvertHourToMinutes(from);
        to = ConvertHourToMinutes(to);
        
        const schedule = this.scheduleService.saveSchedule(weekDay, from, to, roomId, type)

        return response.json(schedule)
    }
    async delete(request: Request, response: Response):Promise<Response> {
        const id = await request.params.scheduleId;

        await this.scheduleService.removeSchedule(id)
        
        return response.json({message: "shcedule removed with success"});

    }
}