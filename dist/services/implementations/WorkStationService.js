"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkStationService = void 0;
const Workstation_1 = __importDefault(require("../../models/Workstation"));
class WorkStationService {
    async updateWorkstation(id, description, name) {
        await Workstation_1.default.update({ "_id": id }, { $set: { "name": name, "description": description } });
    }
    async removeWorkstation(id) {
        await Workstation_1.default.remove({ _id: id });
    }
    async listAllWorkStations() {
        const wokrstations = await Workstation_1.default.find();
        return wokrstations;
    }
    async saveWorkstation(name, description) {
        const workstation = await Workstation_1.default.create({
            name, description
        });
        return workstation;
    }
}
exports.WorkStationService = WorkStationService;
