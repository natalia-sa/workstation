import { Request, Response } from "express"
import Workstation from '../models/Workstation';

export default class WorkstationController {
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