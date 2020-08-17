import * as dotenv from 'dotenv'

dotenv.config()

const SECRET = String(process.env.JWT_TOKEN)

export { SECRET }