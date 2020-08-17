import { Router } from 'express'
import MeetingRoomController from '../controllers/MeetingRoomController';
import { isActiveMiddleware, jwtMiddleware } from './middlewares/auth';

const meetingRoomRounter = Router()

const meetingRoomController = new MeetingRoomController()

meetingRoomRounter.post('/meeting', [isActiveMiddleware, jwtMiddleware], meetingRoomController.create);
meetingRoomRounter.get('/meeting', jwtMiddleware, meetingRoomController.index);
meetingRoomRounter.delete('/meeting/:meetingId', [isActiveMiddleware, jwtMiddleware], meetingRoomController.delete);
meetingRoomRounter.put('/meeting/:meetingId', [isActiveMiddleware, jwtMiddleware], meetingRoomController.update);

export { meetingRoomRounter }