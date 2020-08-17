import mongoose, {Schema, Document} from 'mongoose';

export interface MeetingRoomModel extends Document {
    name: string,
    description: string
    _id: mongoose.Types.ObjectId
}


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

export default mongoose.model<MeetingRoomModel>('meetingRoomSchema', MeetingRoomSchema);