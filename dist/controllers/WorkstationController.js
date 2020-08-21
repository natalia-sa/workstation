"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Workstation_1 = __importDefault(require("../models/Workstation"));
const WorkStationService_1 = require("../services/implementations/WorkStationService");
class WorkstationController {
    constructor() {
        this.workStationService = new WorkStationService_1.WorkStationService();
    }
    async update(request, response) {
        const id = await request.params.workstationId;
        const newName = request.body.name;
        const newDescription = request.body.description;
        await this.workStationService.updateWorkstation(id, newName, newDescription);
        const workstation = await Workstation_1.default.findOne({ _id: id });
        return response.json(workstation);
    }
    async delete(request, response) {
        const id = await request.params.workstationId;
        await this.workStationService.removeWorkstation(id);
        return response.json({ message: "workstation removed with success" });
    }
    async index(request, response) {
        const workstations = await this.workStationService.listAllWorkStations();
        return response.json(workstations);
    }
    async create(request, response) {
        const { name, description } = request.body;
        const workstation = await this.workStationService.saveWorkstation(name, description);
        return response.json(workstation);
    }
}
exports.default = WorkstationController;
