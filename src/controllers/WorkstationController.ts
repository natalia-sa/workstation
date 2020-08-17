import { Request, Response } from "express"
import Workstation from '../models/Workstation';
import { IWorkStationService } from "../services/IWorkStationService";
import { WorkStationService } from "../services/implementations/WorkStationService";

export default class WorkstationController {
    private workStationService: IWorkStationService

    constructor() {
        this.workStationService = new WorkStationService()
    }

    async update(request: Request, response: Response): Promise<Response> {
        const id = await request.params.workstationId;
        const newName = request.body.name;
        const newDescription = request.body.description;

        await this.workStationService.updateWorkstation(id, newName, newDescription)
        
        const workstation = await Workstation.findOne({_id: id})
        return response.json(workstation);

    }

    async delete(request: Request, response: Response): Promise<Response>{
        const id = await request.params.workstationId;

        await this.workStationService.removeWorkstation(id)

        return response.json({message: "workstation removed with success"});
    }
    async index(request: Request, response: Response): Promise<Response> {
        const workstations = await this.workStationService.listAllWorkStations()

        return response.json(workstations);
    }

     async create(request: Request, response: Response): Promise<Response> {
        const {name, description} = request.body

        const workstation = await this.workStationService.saveWorkstation(name, description)
        
        return response.json(workstation);

    }
}