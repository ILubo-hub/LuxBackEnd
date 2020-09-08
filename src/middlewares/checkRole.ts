import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { User } from '../entities/user';


export const checkRole = (_roles: Array<string>) => {

    return async (_req: Request, res: Response, next: NextFunction) => {
        //Get the user ID from previus middleware
        const id = res.locals.jwtPayload.userId;

        const userRepository = getRepository(User);
        let user: User;
        try{
            user = await userRepository.findOne(id, {relations:["role"]}) as User;

            if(user.role.description==="Administrador") next();
            else res.status(401).send("Something is wrong with the user role"+user.role.description);
        }catch(id){
            res.status(401).send("User role not detected");
        }
        
    }
}