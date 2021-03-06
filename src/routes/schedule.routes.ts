import { Router, Request, Response, request } from 'express'
import ScheduleController from '../controllers/ScheduleController';
import { jwtMiddleware, isActiveMiddleware } from './middlewares/auth';

const scheduleRouter = Router()
const scheduleController = new ScheduleController()

scheduleRouter.post('/schedule', [isActiveMiddleware, jwtMiddleware], (request: Request, response: Response) => {
    return scheduleController.create(request, response)
});
scheduleRouter.delete('/schedule/:scheduleId',[isActiveMiddleware, jwtMiddleware], (request: Request, response: Response) => {
    return scheduleController.delete(request, response)
});

scheduleRouter.get('/schedule/:id', jwtMiddleware, (request: Request, response: Response) => {
    return scheduleController.index(request, response)
})

export { scheduleRouter }