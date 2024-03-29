import express,{Request, Response} from 'express';
import User from "../models/user";
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

export const Register =  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({message: errors.array()});
    }
    try {
      let user =  await User.findOne({
            email: req.body.email,
        });

        if(user){
            return res.status(400).json({message: "user already exists!"})
        }
        user = new User(req.body);
        await user.save();

        const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET_KEY as string, 
            {expiresIn: '1h'}
            );
            res.cookie("auth_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 3600000,
            })
            return res.status(200).send({mesage: "user registered OK!"});
            
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "something went wrong!"})
    }
}

