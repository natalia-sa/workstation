import { Request, Response } from "express"
import MeetingRoom from '../models/MeetingRoom';

export default class MeetingRoomController {
    async update(request: Request, response: Response): Promise<Response> {
        const id = await request.params.meetingId;
        const newName = request.body.name;
        const newDescription = request.body.description;
        await MeetingRoom.update({"_id": id}, {$set:{"name": newName, "description": newDescription} })
        
        const meetingRoom = await MeetingRoom.findOne({_id: id})
        return response.json(meetingRoom);

    }

    async delete(request: Request, response: Response): Promise<Response> {
        const id = await request.params.meetingId;
        await MeetingRoom.remove({_id: id});

        return response.json({message: "meeting removed with success"});
    }

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