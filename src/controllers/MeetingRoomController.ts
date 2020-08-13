import { Request, Response } from "express"
import MeetingRoom from '../models/Workstation';

export default class MeetingRoomController {
     async create(request: Request, response: Response): Promise<Response> {
        const {name, description} = request.body

        const meetingRoom = await MeetingRoom.create({ name, description})
        return response.json(meetingRoom);

    }
}