"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LocalStrategy = require('passport-local').Strategy;
const bcrypt_1 = __importDefault(require("bcrypt"));
function initializePassport(passport, getUserByEmail) {
    const authenticateUser = async (email, password, done) => {
        const user = getUserByEmail(email);
        if (user == null) {
            return done(null, false, { message: 'no user found' });
        }
        try {
            if (await bcrypt_1.default.compare(password, user.password)) {
                return done(null, user);
            }
            else {
                return done(null, false, { message: 'password incorrect' });
            }
        }
        catch (e) {
            return done(e);
        }
    };
    passport.use(new LocalStrategy({ usernameField: 'email' }), authenticateUser);
    passport.serializeUser((user, done) => { });
    passport.deserializeUser((id, done) => { });
}
exports.default = initializePassport;
