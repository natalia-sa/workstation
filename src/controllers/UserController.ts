import { Request, Response } from "express"

export default class UserController {
     async store(request: Request, response: Response): Promise<Response> {
        return response.json({ message: "hello"})
    }
}

