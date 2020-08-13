import express from 'express';
import routes from './routes';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

const app = express();

dotenv.config();

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@omnistack-oq54w.mongodb.net/semana09?retryWrites=true&w=majority`,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

app.use(express.json());

app.use(routes);

app.listen(3333);