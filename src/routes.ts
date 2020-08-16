import express from 'express';
import  UserController from './controllers/UserController';
import  WorkstationController from './controllers/WorkstationController';
import MeetingRoomController from './controllers/MeetingRoomController';
import ScheduleController from './controllers/ScheduleController';
import Mail from 'nodemailer/lib/mailer';
import { MailProvider } from './providers/implementations/MailTrapMailProvider';
import { IMessage } from './providers/IMailProvider';


const userController = new UserController();
const workstationController = new WorkstationController();
const meetingRoomController = new MeetingRoomController();
const scheduleController = new ScheduleController();

const routes = express.Router();

routes.post('/users', userController.create);
routes.get('/users', userController.index);
routes.put('/users/:userId', userController.update);
routes.delete('/users/:userId', userController.delete);

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
routes.post('/register', userController.create)
export default routes;