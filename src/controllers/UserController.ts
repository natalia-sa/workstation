import e, { Request, Response } from "express"
import User from '../models/User';
import { IMessage, IMailProvider } from "../providers/IMailProvider";
import { MailProvider } from "../providers/implementations/MailProvider";
import { IUserService } from "../services/IUserService";
import { UserService } from "../services/implementations/UserService";
export default class UserController {
    public mailProvider: IMailProvider
    public userService: IUserService

    constructor () {
        this.mailProvider = new MailProvider()
        this.userService = new UserService()
    }

    async update(request: Request, response: Response): Promise<Response> {

        const id = await request.params.userId;
        const {email, name, address, cpf, bio, birthday} = request.body;

        await this.userService.updateUser(email, name, address, cpf, bio, birthday, id)

        const user = await User.findOne({email})

        return response.status(200).json(user);
    }

    async confirmAccount(request: Request, response: Response): Promise<Response> {
        const { email } = request.query

        try {
            await this.userService.confirmAccount(String(email))

            return response.status(200).json({
                message: 'User confirmed'
            })
        } catch (err) {
            return response.status(400).json({
                message: err.message
            })
        }       
    }

    async index(request: Request, response: Response): Promise<Response> {
        const users = await this.userService.listAllUsers()

        return response.json(users);
    }

    async delete(request: Request, response: Response): Promise<Response> {
        const email = request.params.email;
        
        await this.userService.deleteUser(email)

        return response.json({message: "user removed with success"})
    }

    async getUser(request: Request, response: Response): Promise<Response> {
        const email = request.body.email;
        
        const user = await this.userService.getUser(email)

        return response.json(user)
    }

    async create(request: Request, response: Response): Promise<Response> {
        const { password, email } = request.body
        
        try {

            const user = await User.findOne({ email })
            if (!user) {
                await this.userService.saveUser(email, password)
                await this.sendCofirmationEmail(email)
    
                const user = await User.findOne({email})

                return response.status(200).json(user)
            } else {
                return response.status(400).json({
                    status: 'That email already exists'
                })
            }

        } catch (err) {
            return response.status(400).json({
                status: 'Error creating user. Please contact us'
            })
        }         
    }

    private async sendCofirmationEmail(email: string) {
        const message: IMessage = {
            subject: 'Email Confirmation',
            body: `<h2>Hello ${email}</h2>, 

            <h3> Welcome to coWorking ${email}
            Click <a href="https://${process.env.HOST}/confirm?email=${email}"> HERE </a> to activate your account                   
            </h3>
    
            Team. Coworking`,
            from: {
                email: 'natalia.andre@ccc.ufcg.edu.br',
                name: 'CoWorking'
            },
            to: {
                email: email,
                name: email
            }
        }
        await this.mailProvider.sendMail(message)
    }
}

