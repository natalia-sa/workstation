import  App from './App';
import * as dotenv from 'dotenv';

dotenv.config()
const app = new App()

app.express.listen(process.env.PORT)
