"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isActiveMiddleware = exports.jwtMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret_1 = require("../../config/secret");
const User_1 = __importDefault(require("../../models/User"));
const jwtMiddleware = (request, response, next) => {
    jwtAuth(request, response);
    next();
};
exports.jwtMiddleware = jwtMiddleware;
const isActiveMiddleware = async (request, response, next) => {
    jwtAuth(request, response);
    const { email } = request.body;
    const user = await User_1.default.findOne({ email });
    if (!user) {
        return response.status(400).json({
            message: 'User not found'
        });
    }
    if (!user.isActive) {
        return response.status(400).json({
            message: 'User is not active'
        });
    }
    next();
};
exports.isActiveMiddleware = isActiveMiddleware;
const jwtAuth = (request, response) => {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        return response.status(401).json({
            message: 'No Token Provided'
        });
    }
    const parts = authHeader.split(' ');
    if (parts.length !== 2) {
        return response.status(401).json({
            message: 'Token error'
        });
    }
    const [scheme, token] = parts;
    jsonwebtoken_1.default.verify(token, secret_1.SECRET, (err, decoded) => {
        if (err) {
            return response.status(401).json({
                message: 'Token Invalid'
            });
        }
        request.body.email = decoded.id;
    });
};
