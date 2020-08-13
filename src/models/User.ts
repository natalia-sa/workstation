import mongoose, {Schema} from 'mongoose';

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true
    }
    
})

export default mongoose.model('userSchema', UserSchema);

