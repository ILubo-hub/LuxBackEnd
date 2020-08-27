import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { User } from "../entities/user";


 export class userController {
   static listAll = async (req: Request, res: Response) => {
     //Get users from dataBase
     const userRespository = getRepository(User);
     const users = await userRespository.find({
       select: ["id", "name", "lastname"]
     });

     res.send(users);
   };

   static getOneById = async (req: Request, res: Response) => {
     //Get the Id from the url
     const id: number = parseInt(req.params.id);

     //Get the user form the database
     const userRespository = getRepository(User);
     try{
       const user = await userRespository.findOneOrFail(id, {
         select: ["id", "name", "lastname"]
       });
       res.status(200).send({"msj": "User found succesfully", "data": user});
     }catch(error){
       res.status(404).send("User not found");
     }
   };

   static newUser = async (req: Request, res: Response) => {
     //Get params from the body
     let {name, lastname, email, password} = req.body;
     let user = new User();
     user.name = name;
     user.lastname = lastname;
     user.email = email;
     user.password = password;

     const errors = await validate(user);
     if(errors.length>0){
       res.status(400).send(errors);
       return;
     }

     const userRespository = getRepository(User);
     try{
       await userRespository.save(user);
     }catch(error){
       res.status(409).send("Email is already in use");
       return;
     }

     res.status(201).send("User created succesfully");
   };

   static editUser = async (req: Request, res: Response) => {
     //Get the id from the url
     const id = req.params.id;
     
     //Get values from the body
     const { name, lastname } = req.body;

     //Try to find user on database
     const userRespository = getRepository(User);
     let user;
     try{
       user = await userRespository.findOneOrFail(id);
     }catch(error){
       res.status(404).send("User not found");
       return;
     }

     //Validate the new values
     user.name = name;
     user.lastname = lastname;
     const errors = await validate(user);
     if(errors.length > 0){
       res.status(400).send(errors);
       return;
     }

     //try to safe, if fails, that means username is already in use
     try{
       await userRespository.save(user);
     }catch(e){
       res.status(409).send("Name is Already in use");
       return;
     }

     res.status(504).send();
   };

   static deleteUser = async (req: Request, res: Response)=> {
     //Get the id from the url
     const id = req.params.id;
     const userRespository = getRepository(User);
     let user: User;
     try{
       user = await userRespository.findOneOrFail(id);
     }catch(error){
       res.status(404).send("User not found");
       return;
     }
     userRespository.delete(id);
     res.status(204).send();
   };
 }

 export default userController;
