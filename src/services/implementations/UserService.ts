import bcrypt from 'bcrypt';
import User, { UserModel } from '../../models/User';
import { IUserService } from '../IUserService';
import * as doentev from 'dotenv'

export class UserService implements IUserService {
    constructor() {
        doentev.config
    }

    public async updateUser(email: string, name: string, address: string, cpf: string, bio: string, birthday: string, id: string): Promise<void> {
        await User.updateMany({"_id": id}, 
        {$set:
            {"email": email,
            "name":name,
            "address": address, 
            "cpf":cpf,
            "bio": bio, 
            "birthday": birthday}})
    }
    public async deleteUser(email: string): Promise<void> {
        await User.deleteOne({ email })
    }
    public async listAllUsers(): Promise<UserModel[]> {
        const users = await User.find({})

        return users
    }
    public async getUser(email:string):Promise<any> {
        const user = await User.findOne({email});

        return user;
    }

    public async confirmAccount(email: string): Promise<void> {
        const user = await User.findOne({ email })

        if (user) {
            user.isActive = true
            await user.save()
        } else { 
            throw new Error('User doesnt exist')
        }
    }    
    public async saveUser(email: string, password: string): Promise<void> {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            await User.create( { email, hashedPassword });
        } catch (err) {
            throw new Error(err.message);
        }
    }
}