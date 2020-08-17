import { Router, Response, Request } from  'express'
import WorkstationController from '../controllers/WorkstationController';
import { isActiveMiddleware, jwtMiddleware } from './middlewares/auth';

const workstationRouter = Router()

const workstationController = new WorkstationController()

workstationRouter.post('/workstation', [isActiveMiddleware, jwtMiddleware],  (request: Request, response: Response) => {
    return workstationController.create(request, response)
});
workstationRouter.get('/workstation', jwtMiddleware,  (request: Request, response: Response) => {
    return workstationController.index(request, response)
});
workstationRouter.delete('/workstation/:workstationId', [isActiveMiddleware, jwtMiddleware], (request: Request, response: Response) => { 
    return workstationController.delete(request, response)
});

workstationRouter.put('/workstation/:workstationId', [isActiveMiddleware, jwtMiddleware], (request: Request, response: Response) => { 
    return workstationController.update(request, response)
});

export { workstationRouter }