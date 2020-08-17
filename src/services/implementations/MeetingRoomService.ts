import { IMeetingRoomService } from "../IMeetingRoomService";
import MeetingRoom, { MeetingRoomModel } from "../../models/MeetingRoom";

export class MeetingRoomService implements IMeetingRoomService {
    async updateMeetingRoom(id: string, description: string, name: string): Promise<void> {
        await MeetingRoom.update({"_id": id}, {$set:{"name": name, "description": description} })
    }
    async removeMeetingRoom(id: string): Promise<void> {
        await MeetingRoom.remove({_id: id});
    }
    async listAllMeetingRooms(): Promise<MeetingRoomModel[]> {
        const meetingRoom = await MeetingRoom.find();

        return meetingRoom

    }
    async saveMeetingRoom(name: string, description: string): Promise<MeetingRoomModel> {
        const meetingRoom = await MeetingRoom.create({
            name, description
        })

        return meetingRoom
    }

}