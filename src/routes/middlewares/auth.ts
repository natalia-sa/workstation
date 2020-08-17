import { Response, Request, NextFunction } from "express";
import jwt from 'jsonwebtoken'
import { SECRET } from "../../config/secret";
import User from "../../models/User";

const jwtMiddleware = (request: Request, response: Response, next: NextFunction) => {
    jwtAuth(request, response)
    next()
}

const isActiveMiddleware = async (request: Request, response: Response, next: NextFunction) => {
    jwtAuth(request, response)

    const { email } = request.body   

    const user = await User.findOne({ email })

    if (!user) {
        return response.status(400).json({
            message: 'User not found'
        })
    }

    if (!user.isActive) {
        return response.status(400).json({
            message: 'User is not active'
        })   
    }

    next()
}

const jwtAuth = (request: Request, response: Response) => {
    const authHeader = request.headers.authorization

    if (!authHeader) {
        return response.status(401).json({
            message: 'No Token Provided'
        })
    }

    const parts = authHeader.split(' ')

    if (parts.length !== 2) {
        return response.status(401).json({
            message: 'Token error'
        })
    }

    const [ scheme, token ] = parts

    jwt.verify(token, SECRET, (err, decoded: any) => {
        if (err) {
            return response.status(401).json({
                message: 'Token Invalid'
            })
        }

        request.body.email = decoded.id
    })

}

export { jwtMiddleware, isActiveMiddleware }

