import { Request, Response } from "express"
import User from '../models/User';

export default class UserController {
    async index(request: Request, response: Response): Promise<Response> {
        const users = await User.find();

        return response.json(users);
    }
    
     async create(request: Request, response: Response): Promise<Response> {
        const email = request.body.email;

        let user = await User.findOne({ email: email })
    
        if(!user) {
            user = await User.create({ email });
        }

        return response.json(user);

    }
}
