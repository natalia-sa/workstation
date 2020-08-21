"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const MailProvider_1 = require("../providers/implementations/MailProvider");
const UserService_1 = require("../services/implementations/UserService");
class UserController {
    constructor() {
        this.mailProvider = new MailProvider_1.MailProvider();
        this.userService = new UserService_1.UserService();
    }
    async update(request, response) {
        const id = await request.params.userId;
        const { email, name, address, cpf, bio, birthday } = request.body;
        await this.userService.updateUser(email, name, address, cpf, bio, birthday, id);
        const user = await User_1.default.findOne({ email });
        return response.status(200).json(user);
    }
    async confirmAccount(request, response) {
        const { email } = request.query;
        try {
            await this.userService.confirmAccount(String(email));
            return response.status(200).json({
                message: 'User confirmed'
            });
        }
        catch (err) {
            return response.status(400).json({
                message: err.message
            });
        }
    }
    async index(request, response) {
        const users = await this.userService.listAllUsers();
        return response.json(users);
    }
    async delete(request, response) {
        const email = request.params.email;
        await this.userService.deleteUser(email);
        return response.json({ message: "user removed with success" });
    }
    async create(request, response) {
        const { password, email } = request.body;
        try {
            const user = await User_1.default.findOne({ email });
            if (!user) {
                await this.userService.saveUser(email, password);
                await this.sendCofirmationEmail(email);
                const user = await User_1.default.findOne({ email });
                return response.status(200).json(user);
            }
            else {
                return response.status(400).json({
                    status: 'That email already exists'
                });
            }
        }
        catch (err) {
            return response.status(400).json({
                status: 'Error creating user. Please contact us'
            });
        }
    }
    async sendCofirmationEmail(email) {
        const message = {
            subject: 'Email Confirmation',
            body: `<h2>Hello ${email}</h2>, 

            <h3> Welcome to coWorking ${email}
            Click <a href="http://${process.env.HOST}:${process.env.PORT}/confirm?email=${email}"> HERE </a> to activate your account                   
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
        };
        await this.mailProvider.sendMail(message);
    }
}
exports.default = UserController;
