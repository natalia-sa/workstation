import { Request, Response } from "express"
import Workstation from '../models/Workstation';

export default class WorkstationController {
    async update(request: Request, response: Response): Promise<Response> {
        const id = await request.params.workstationId;
        const newName = request.body.name;
        const newDescription = request.body.description;
        await Workstation.update({"_id": id}, {$set:{"name": newName, "description": newDescription} })
        
        const workstation = await Workstation.findOne({_id: id})
        return response.json(workstation);

    }

    async delete(request: Request, response: Response): Promise<Response>{
        const id = await request.params.workstationId;
        await Workstation.remove({_id: id});

        return response.json({message: "workstation removed with success"});
    }
    async index(request: Request, response: Response): Promise<Response> {
        const workstations = await Workstation.find();
        
        return response.json(workstations);
    }

     async create(request: Request, response: Response): Promise<Response> {
        const {name, description} = request.body

        const workstation = await Workstation.create({ name, description})
        
        return response.json(workstation);

    }
}