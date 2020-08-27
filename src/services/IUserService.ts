import { UserModel } from "../models/User";

export interface IUserService {
    saveUser(email: string, password: string): Promise<void>
    confirmAccount(email: string): Promise<void>
    listAllUsers(): Promise<UserModel[]>
    deleteUser(email: string): Promise<void>
    getUser(email:string):Promise<any>
    updateUser(email: string, name: string, address: string, cpf: string, bio: string, birthday: string, id: string): Promise<void>
}