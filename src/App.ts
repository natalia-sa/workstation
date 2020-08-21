import express, { Router, response, application } from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { authRouter } from './routes/auth.routes';
import { userRouter } from './routes/user.routes';
import { workstationRouter } from './routes/workstation.routes';
import { meetingRoomRounter } from './routes/meetingRoom.routes';
import { scheduleRouter } from './routes/schedule.routes';

export default class App {
    public express: express.Application

    constructor () {
        dotenv.config();
        this.express = express()
        this.middlewares()
        this.database()
        this.routes()
    }

    private middlewares() {
        this.express.use(express.json())
        this.express.use(cors({origin: 'https://coworking1-frontend.herokuapp.com'}));
    }

    private async database() {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_URL}/${process.env.DB_DATABSE}?retryWrites=true&w=majority`,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
    }
    private routes() {
        this.express.use(authRouter)
        this.express.use(userRouter)
        this.express.use(workstationRouter)
        this.express.use(meetingRoomRounter)
        this.express.use(scheduleRouter)
    }
    
}