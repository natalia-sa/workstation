import { Request, Response } from "express"
import User from '../models/User';
import { UserService } from "../services/UserService";
import { IMessage, IMailProvider } from "../providers/IMailProvider";
import { MailProvider } from "../providers/implementations/MailTrapMailProvider";
export default class UserController {
    private userService: UserService
    private mailProvider: IMailProvider

    constructor () {
        this.userService = new UserService()
        this.mailProvider = new MailProvider()
    }

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

    async delete(request: Request, response: Response): Promise<Response> {
        const id = request.params.userId;
        await User.remove({_id: id});
        return response.json({message: "user removed with success"})
    }

    async create(request: Request, response: Response): Promise<Response> {
        const { password, email } = request.body
        
        try {
            await this.userService.saveUser(email, password)

            const message: IMessage = {
                subject: 'Email Confirmation',
                body: '<h1> Olá, Esse é um email de confirmação</h1><br><p>Cliente no seguinte email para confirmar sua conta.</p>',
                from: {
                    email: 'coworking@mail.com',
                    name: 'CoWorking'
                },
                to: {
                    email: email,
                    name: email
                }
            }
            await this.mailProvider.sendMail(message)

            return response.status(200).json({
                status: 'User Created'
            })

        } catch (err) {
            return response.status(400).json({
                status: 'Error creating user. Please contact us'
            })
        }         
    }
}

