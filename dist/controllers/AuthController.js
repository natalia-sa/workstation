"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const secret_1 = require("../config/secret");
class AuthController {
    async authenticate(request, response) {
        const { email, password } = request.body;
        const user = await User_1.default.findOne({ email }).select('+hashedPassword');
        if (!user) {
            return response.status(400).json({
                message: "User not registered"
            });
        }
        if (!await bcrypt_1.default.compare(password, user.hashedPassword)) {
            return response.status(400).json({
                message: "Wrong Password"
            });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.email }, secret_1.SECRET, {
            expiresIn: "1d"
        });
        return response.status(200).json({ token });
    }
}
exports.AuthController = AuthController;
