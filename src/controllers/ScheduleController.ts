import { Request, Response } from "express";
import Schedule from '../models/Schedule';
import ConvertHourToMinutes from '../utils/ConvertHoursToMinutes';

export default class ScheduleController {
    async create(request: Request, response: Response):Promise<Response> {
        var {week_day, from , to, roomId, type } = request.body;

        from = ConvertHourToMinutes(from);
        to = ConvertHourToMinutes(to);
        

        const schedule = await Schedule.create({week_day, from, to, roomId, type});
        return response.json(schedule)
    }
    async delete(request: Request, response: Response):Promise<Response> {
        const id = await request.params.scheduleId;

        await Schedule.remove({_id: id});
        return response.json({message: "shcedule removed with success"});

    }
}