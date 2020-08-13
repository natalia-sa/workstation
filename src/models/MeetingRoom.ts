import mongoose, {Schema} from 'mongoose';

const MeetingRoomSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    }
    
})

export default mongoose.model('meetingRoomSchema', MeetingRoomSchema);