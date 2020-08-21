"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../../models/User"));
const doentev = __importStar(require("dotenv"));
class UserService {
    constructor() {
        doentev.config;
    }
    async updateUser(email, name, address, cpf, bio, birthday, id) {
        await User_1.default.updateMany({ "_id": id }, { $set: { "email": email,
                "name": name,
                "address": address,
                "cpf": cpf,
                "bio": bio,
                "birthday": birthday } });
    }
    async deleteUser(email) {
        await User_1.default.deleteOne({ email });
    }
    async listAllUsers() {
        const users = await User_1.default.find({});
        return users;
    }
    async confirmAccount(email) {
        const user = await User_1.default.findOne({ email });
        if (user) {
            user.isActive = true;
            await user.save();
        }
        else {
            throw new Error('User doesnt exist');
        }
    }
    async saveUser(email, password) {
        try {
            const hashedPassword = await bcrypt_1.default.hash(password, 10);
            await User_1.default.create({ email, hashedPassword });
        }
        catch (err) {
            throw new Error(err.message);
        }
    }
}
exports.UserService = UserService;
