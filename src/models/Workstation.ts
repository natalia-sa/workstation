import mongoose, {Schema, Document} from 'mongoose';

export interface WorkstationModel extends Document {
    name: string,
    description: string
    _id: mongoose.Types.ObjectId
}

const WorkstationSchema = new Schema({
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

export default mongoose.model<WorkstationModel>('workstationSchema', WorkstationSchema);