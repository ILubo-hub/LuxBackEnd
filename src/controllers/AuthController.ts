import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';

import {User} from '../entities/user';

import config from "../config/config";

class AuthController {
    static login = async(req: Request, res: Response) => {
        let { email, password } = req.body;
        if(!(email && password)) {
            res.status(400).send("Incorrect data");
        }

        //Get user form database
        const userRepository = getRepository(User);
        let user: User;
        try{
            user = await userRepository.findOneOrFail({where: {email}});

            if(!user.checkIfUnencryptedPasswordIsValid(password)) {
                res.status(401).send("Incorrect password");
            }

            const token = jwt.sign(
                {userId: user.id, email: user.email},
                config.jwtSecret,
                {expiresIn: "1h"}
            )

            res.send(token);

        }catch(error){
            res.status(401).send("User not found");
        }
    };

    static changePassword = async(req: Request, res:Response) => {
        //Get id from jwt
        const id = res.locals.jwtPayload.userId;

        //Get parameters form the body
        const { oldpassword, newPassword } = req.body;
        if(!(oldpassword && newPassword)) {
            res.status(400).send();
        }

        const userRespository = getRepository(User);
        let user: User;
        try{
            user = await userRespository.findOneOrFail(id);
            if(!user.checkIfUnencryptedPasswordIsValid(oldpassword)) {
                res.status(401).send();
            }
            user.password = newPassword;
            const errors = await validate(user);
            if(errors.length > 0){
                res.status(40).send(errors);
                return;
            }
            user.hasPassword();
            userRespository.save(user);

            res.status(204).send("Password changed");
        }catch(id){
            res.status(401).send("User not found");
        }
    };
}

export default AuthController;