import { MeetingRoomModel } from "../models/MeetingRoom";

export interface IMeetingRoomService {
    saveMeetingRoom(name: string, description: string): Promise<MeetingRoomModel>
    listAllMeetingRooms(): Promise<MeetingRoomModel[]>
    removeMeetingRoom(id: string): Promise<void>
    updateMeetingRoom(id: string, description: string, name: string): Promise<void>
}