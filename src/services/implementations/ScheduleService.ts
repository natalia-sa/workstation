import { IScheduleService } from "../IScheduleService";
import Schedule, { ScheduleModel } from "../../models/Schedule";

export class ScheduleService implements IScheduleService {
    async findByRoomId(id: string): Promise<ScheduleModel[]> {
        const schedules = Schedule.find({
            roomId: id
        })

        return schedules
    }
    async saveSchedule(weekDay: string, from: string, to: string, roomId: string, type: string): Promise<ScheduleModel> {
        const schedule = await Schedule.create({weekDay, from, to, roomId, type});

        return schedule
    }
    async removeSchedule(id: string): Promise<void> {
        await Schedule.remove({_id: id});
    }

}