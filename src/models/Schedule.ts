import mongoose, {Schema} from 'mongoose';

const ScheduleSchema = new Schema({
    week_day:{
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
        type:String,
        required: true
    },
    type: {
        type: String,
        required:true
    }
})

export default mongoose.model('scheduleSchema', ScheduleSchema);