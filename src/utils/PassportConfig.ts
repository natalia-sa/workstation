const LocalStrategy = require('passport-local').Strategy;
import bcrypt from 'bcrypt';

export default function initializePassport(passport : any, getUserByEmail: any) {
    const authenticateUser = async (email:any, password:any, done: any) =>  {
        const user = getUserByEmail(email)
        if(user == null) {
            return done(null, false, {message:'no user found'})
        }
        try{
            if(await bcrypt.compare(password, user.password)) {
                return done(null, user)
            }else {
                return done(null, false, {message: 'password incorrect'})
            }
        }catch(e) {
            return done(e)
        }
    }
    passport.use(new LocalStrategy({usernameField:'email'}),authenticateUser)
    passport.serializeUser((user: any, done: any) => {})
    passport.deserializeUser((id: any, done: any) => {})
}