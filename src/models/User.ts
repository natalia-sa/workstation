import mongoose, {Schema} from 'mongoose';

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
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
    }
    
})

export default mongoose.model('userSchema', UserSchema);

