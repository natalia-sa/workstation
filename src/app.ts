import express from 'express';
import routes from './routes';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

export default class app {
    public express: express.Application

    private middlewares() {
        this.express.use(express.json())
    }

    constructor () {
        dotenv.config();
        this.express = express()
        this.middlewares()
        this.database()
        this.routes()
    }

    private async database() {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@omnistack-oq54w.mongodb.net/semana09?retryWrites=true&w=majority`,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
    }
    private routes() {
        this.express.use(routes)
    }
}