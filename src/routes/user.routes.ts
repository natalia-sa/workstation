import { Router, Request, Response } from 'express'
import UserController from '../controllers/UserController'
import { isActiveMiddleware, jwtMiddleware } from './middlewares/auth'

const userRouter = Router()
const userController = new UserController()

userRouter.post('/signup', (request, response) => {
    return userController.create(request, response)
})

userRouter.get('/confirm', (request, response) => {
    return userController.confirmAccount(request, response)
})

userRouter.get('/user', (request,response) => {
    return userController.getUser(request, response)
})

userRouter.get('/users', jwtMiddleware, (request: Request, response: Response) => {
    return userController.index(request, response)
});

userRouter.put('/users/:userId', [isActiveMiddleware, jwtMiddleware], (request: Request, response: Response) => {
    return userController.update(request, response)
});

userRouter.delete('/users/:userId', [isActiveMiddleware, jwtMiddleware], (request: Request, response: Response) => {
    return userController.delete(request, response)
});

export { userRouter }