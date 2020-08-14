import { Request, Response } from "express"
import User from '../models/User';

export default class UserController {
    async update(request: Request, response: Response): Promise<Response> {

        const id = await request.params.userId;
        const {email, name, address, cpf, bio, birthday} = request.body;

        await User.updateMany({"_id": id}, 
            {$set:
                {"email": email,
                "name":name,
                "address": address, 
                "cpf":cpf,
                "bio": bio, 
                "birthday": birthday}})

        const user = await User.findOne({_id: id})
        return response.json(user);

    }

    async index(request: Request, response: Response): Promise<Response> {
        const users = await User.find();

        return response.json(users);
    }

     async create(request: Request, response: Response): Promise<Response> {
        const email = request.body.email;
        const password = request.body.password;

        let user = await User.findOne({ email: email })
    
        if(!user) {
            user = await User.create({ email, password});
        }

        return response.json(user);

    }
}

