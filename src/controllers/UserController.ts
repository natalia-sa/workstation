import { Request, Response } from "express"
import User from '../models/User';

export default class UserController {
     async create(request: Request, response: Response): Promise<Response> {
        const email = request.body.email;

        const user = await User.create({ email});

        return response.json(user);

    }
}

