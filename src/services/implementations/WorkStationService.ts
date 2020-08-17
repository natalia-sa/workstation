import { IWorkStationService } from "../IWorkStationService";
import Workstation, { WorkstationModel } from "../../models/Workstation";

export class WorkStationService implements IWorkStationService {
    async updateWorkstation(id: string, description: string, name: string): Promise<void> {
        await Workstation.update({"_id": id}, {$set:{"name": name, "description": description} })
    }
    async removeWorkstation(id: string): Promise<void> {
        await Workstation.remove({_id: id});
    }
    async listAllWorkStations(): Promise<WorkstationModel[]> {
        const wokrstations = await Workstation.find();

        return wokrstations

    }
    async saveWorkstation(name: string, description: string): Promise<WorkstationModel> {
        const workstation = await Workstation.create({
            name, description
        })

        return workstation
    }

}