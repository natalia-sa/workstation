import { Router, Request, Response, request } from 'express'
import MeetingRoomController from '../controllers/MeetingRoomController';
import { isActiveMiddleware, jwtMiddleware } from './middlewares/auth';

const meetingRoomRounter = Router()

const meetingRoomController = new MeetingRoomController()

meetingRoomRounter.post('/meeting', [isActiveMiddleware, jwtMiddleware], (request: Request, response: Response) => { 
   return meetingRoomController.create(request, response)
});

meetingRoomRounter.get('/meeting', jwtMiddleware, (request: Request, response: Response) => {
    return meetingRoomController.index(request, response)
});

meetingRoomRounter.delete('/meeting/:meetingId', [isActiveMiddleware, jwtMiddleware], (request: Request, response: Response) => {
    return meetingRoomController.delete(request, response)
});

meetingRoomRounter.put('/meeting/:meetingId', [isActiveMiddleware, jwtMiddleware], (request: Request, response: Response) => {
    return meetingRoomController.update(request, response)
});

export { meetingRoomRounter }