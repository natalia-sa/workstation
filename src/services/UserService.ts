import bcrypt from 'bcrypt';
import User from '../models/User';

export class UserService {
    public async saveUser(email: string, password: string): Promise<void> {
        try {
            const hashedPass = await bcrypt.hash(password, 10);
            await User.create({email, hashedPass});
        } catch (err) {
            throw new Error(err.message);
        }
    }

}