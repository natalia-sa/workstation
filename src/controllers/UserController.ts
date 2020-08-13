import { Request, Response } from "express"
import User from '../models/User';

export default class UserController {
    async update(request: Request, response: Response): Promise<Response> {
        const id = await request.params.userId;
        const newValue = request.body.email
        await User.update({"_id": id}, {$set:{"email": newValue}})

        const user = await User.findOne({_id: id})
        return response.json(user);

    }
    
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

