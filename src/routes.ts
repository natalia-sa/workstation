import express from 'express';
import  UserController from './controllers/UserController';
import  WorkstationController from './controllers/WorkstationController';
import MeetingRoomController from './controllers/MeetingRoomController';

const userController = new UserController();
const workstationController = new WorkstationController();
const meetingRoomController = new MeetingRoomController();

const routes = express.Router();

routes.post('/users', userController.create);
routes.post('/workstation', workstationController.create);
routes.post('/meeting', meetingRoomController.create);

export default routes;