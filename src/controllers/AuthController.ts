import { Request, Response } from "express";

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from "../models/User";
import { SECRET } from "../config/secret";

export class AuthController {
    async authenticate(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body

        const user = await User.findOne( { email} ).select('+hashedPassword')
    
        if (!user) {
            return response.status(400).json({
                message: "User not registered"
            })
        }
    
        if (!await bcrypt.compare(password, user.hashedPassword)) {
            return response.status(400).json({
                message: "Wrong Password"
            })
        }    
        
        const token = jwt.sign({ id: user.email }, SECRET , {
            expiresIn: "1h"
          });
                
        
        return response.status(200).json({ token })
    }
}