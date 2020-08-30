import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
    //Get the jwt token from the head
    const token = <string>req.headers["auth"];
    let jwtPayload;

    //try to validate the token and get data
    try{
        jwtPayload = <any>jwt.verify(token, config.jwtSecret);
        res.locals.jwtPayload = jwtPayload;
    }catch(error){
        res.status(401).send("The token is unauthorized");
        return;
    }

    const { userId, email } = jwtPayload;
    const newToken = jwt.sign({userId, email}, config.jwtSecret, {expiresIn: "1h"});
    res.setHeader("token", newToken);

    //Call the next middleware or controller
    next();
}