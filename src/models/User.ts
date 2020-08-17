import mongoose, {Schema, Document} from 'mongoose';

export interface UserModel extends Document{
    email: string,
    hashedPassword: string,
    name?: string,
    address?: string,
    cpf?: string,
    bio?: string,
    birthday?: string,
    isActive?: boolean
}

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true
    },
    hashedPassword: {
        type: String,
        required: true,
        select: false
    },
    name: {
        type:String,
        required: false
    },
    address: {
        type:String,
        required: false
    },
    cpf: {
        type:String,
        required: false
    },
    bio: {
        type:String,
        required: false
    },
    birthday: {
        type:String,
        required: false
    },
    isActive: {
        type: Boolean,
        required: false,
        default: false
    }
    
})


export default mongoose.model<UserModel>('userSchema', UserSchema);

