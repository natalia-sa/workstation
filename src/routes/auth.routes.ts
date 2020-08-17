import { Router } from 'express'
import { AuthController } from '../controllers/AuthController'

const authRouter = Router()
const authController = new AuthController()

authRouter.post('/auth/authenticate', async (request, response) => {
    return authController.authenticate(request, response)
})

export { authRouter }
