import { ScheduleModel } from "../models/Schedule";

export interface IScheduleService {
    saveSchedule(weekDay: string, from: string , to: string, roomId: string, type: string): Promise<ScheduleModel>
    removeSchedule(id: string): Promise<void>
}
