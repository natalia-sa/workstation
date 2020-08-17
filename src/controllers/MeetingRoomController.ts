import { Request, Response } from "express"
import MeetingRoom from '../models/MeetingRoom';
import { IMeetingRoomService } from "../services/IMeetingRoomService";
import { MeetingRoomService } from "../services/implementations/MeetingRoomService";

export default class MeetingRoomController {
    private meetingRoomService: IMeetingRoomService

    constructor() {
        this.meetingRoomService = new MeetingRoomService()
    }

    async update(request: Request, response: Response): Promise<Response> {
        const id = await request.params.meetingId;
        const newName = request.body.name;
        const newDescription = request.body.description;

        await this.meetingRoomService.updateMeetingRoom(id, newDescription, newName)
        
        const meetingRoom = await MeetingRoom.findOne({_id: id})
        return response.json(meetingRoom);

    }

    async delete(request: Request, response: Response): Promise<Response> {
        const id = await request.params.meetingId;

        await this.meetingRoomService.removeMeetingRoom(id)

        return response.json({message: "meeting removed with success"});
    }

    async index(request: Request, response: Response): Promise<Response> {
        const meetingRooms = await this.meetingRoomService.listAllMeetingRooms()

        return response.json(meetingRooms);
    }

     async create(request: Request, response: Response): Promise<Response> {
        const {name, description} = request.body

        const meetingRoom = await this.meetingRoomService.saveMeetingRoom(name, description)
        
        return response.json(meetingRoom);

    }
}