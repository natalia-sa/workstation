import express from 'express';
import routes from './routes';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import cors from 'cors';

export default class App {
    public express: express.Application

    private middlewares() {
        this.express.use(express.json())
        this.express.use(cors());
        
    }

    constructor () {
        dotenv.config();
        this.express = express()
        this.middlewares()
        this.database()
        this.routes()
    }

    private async database() {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@omnistack-oq54w.mongodb.net/coworking?retryWrites=true&w=majority`,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
    }
    private routes() {
        this.express.use(routes)
    }
}