import { Router } from 'express'
import ScheduleController from '../controllers/ScheduleController';
import { jwtMiddleware, isActiveMiddleware } from './middlewares/auth';

const scheduleRouter = Router()
const scheduleController = new ScheduleController()

scheduleRouter.post('/schedule', [isActiveMiddleware, jwtMiddleware], scheduleController.create);
scheduleRouter.delete('/schedule/:scheduleId',[isActiveMiddleware, jwtMiddleware], scheduleController.delete);

export { scheduleRouter }