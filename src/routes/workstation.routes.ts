import { Router } from  'express'
import WorkstationController from '../controllers/WorkstationController';
import { isActiveMiddleware, jwtMiddleware } from './middlewares/auth';

const workstationRouter = Router()

const workstationController = new WorkstationController()

workstationRouter.post('/workstation', [isActiveMiddleware, jwtMiddleware],  workstationController.create);
workstationRouter.get('/workstation', jwtMiddleware, workstationController.index);
workstationRouter.delete('/workstation/:workstationId', [isActiveMiddleware, jwtMiddleware], workstationController.delete);
workstationRouter.put('/workstation/:workstationId', [isActiveMiddleware, jwtMiddleware], workstationController.update);

export { workstationRouter }