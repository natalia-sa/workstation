import express from 'express';
import  UserController from './controllers/UserController';
import  WorkstationController from './controllers/WorkstationController';
import MeetingRoomController from './controllers/MeetingRoomController';

const userController = new UserController();
const workstationController = new WorkstationController();
const meetingRoomController = new MeetingRoomController();

const routes = express.Router();

routes.post('/users', userController.create);
routes.get('/users', userController.index);

routes.post('/meeting', meetingRoomController.create);
routes.get('/meeting', meetingRoomController.index);

routes.post('/workstation', workstationController.create);
routes.get('/workstation', workstationController.index);

export default routes;