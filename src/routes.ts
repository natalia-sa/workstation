import express from 'express';
import  UserController  from './controllers/UserController';
import  WorkstationController from './controllers/WorkstationController';
import MeetingRoomController from './controllers/MeetingRoomController';
import ScheduleController from './controllers/ScheduleController';
import User from './models/User';
import { AuthController } from './controllers/AuthController';

const userController = new UserController();
const workstationController = new WorkstationController();
const meetingRoomController = new MeetingRoomController();
const scheduleController = new ScheduleController();
const authController = new AuthController()

const routes = express.Router();

routes.post('/auth/authenticate', async (request, response) => {
    return authController.authenticate(request, response)
})

routes.post('/signup', (request, response) => {
    return userController.create(request, response)
})

routes.get('/confirm', (request, response) => {
    return userController.confirmAccount(request, response)
})

routes.get('/users', (request, response) => {
    return userController.index(request, response)
});

routes.put('/users/:userId', (request, response) => {
    return userController.update(request, response)
});

routes.delete('/users/:userId', (request, response) => {
    return userController.delete(request, response)
});

routes.post('/schedule', scheduleController.create);
routes.delete('/schedule/:scheduleId', scheduleController.delete);

routes.post('/meeting', meetingRoomController.create);
routes.get('/meeting', meetingRoomController.index);
routes.delete('/meeting/:meetingId', meetingRoomController.delete);
routes.put('/meeting/:meetingId', meetingRoomController.update);

routes.post('/workstation', workstationController.create);
routes.get('/workstation', workstationController.index);
routes.delete('/workstation/:workstationId', workstationController.delete);
routes.put('/workstation/:workstationId', workstationController.update);
export default routes;