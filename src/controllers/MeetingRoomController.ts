import { Request, Response } from "express"
import MeetingRoom from '../models/MeetingRoom';

export default class MeetingRoomController {
    async index(request: Request, response: Response): Promise<Response> {
        const meetingRooms = await MeetingRoom.find();

        return response.json(meetingRooms);
    }
     async create(request: Request, response: Response): Promise<Response> {
        const {name, description} = request.body

        const meetingRoom = await MeetingRoom.create({ name, description})
        return response.json(meetingRoom);

    }
}