import mongoose, {Schema, Document} from 'mongoose';

export interface ScheduleModel extends Document {
    weekDay: number,
    from: number,
    to: number,
    roomId: string,
    type: string
}

const ScheduleSchema = new Schema({
    weekDay:{
        type: Number,
        required: true
    },
    from: {
        type: Number,
        required: true
    },
    to: {
        type: Number,
        required: true
    },
    roomId: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required:true
    }
})

export default mongoose.model<ScheduleModel>('scheduleSchema', ScheduleSchema);