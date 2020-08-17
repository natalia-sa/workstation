import { WorkstationModel } from "../models/Workstation";

export interface IWorkStationService {
    saveWorkstation(name: string, description: string): Promise<WorkstationModel>
    listAllWorkStations(): Promise<WorkstationModel[]>
    removeWorkstation(id: string): Promise<void>
    updateWorkstation(id: string, description: string, name: string): Promise<void>
}