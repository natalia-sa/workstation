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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const UserSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        trim: true
    },
    hashedPassword: {
        type: String,
        required: true,
        select: false
    },
    name: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    cpf: {
        type: String,
        required: false
    },
    bio: {
        type: String,
        required: false
    },
    birthday: {
        type: String,
        required: false
    },
    isActive: {
        type: Boolean,
        required: false,
        default: false
    }
});
exports.default = mongoose_1.default.model('userSchema', UserSchema);
