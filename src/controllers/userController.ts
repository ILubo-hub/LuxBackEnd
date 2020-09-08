import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import * as bcrypt from 'bcryptjs';

import { User } from "../entities/user";
import { Role } from "../entities/role";


 class userController {
   static listAll = async (_req: Request, res: Response) => {
     //Get users from dataBase
     
      const userRespository = getRepository(User);
      const users = await userRespository.find({relations:["role"]});
      res.status(200).send({"msj":"Users listed succesfully","data": users});
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
     let {name, lastname, email, roleId, password} = req.body;
     let role = new Role();

     if(roleId===1){
       role.id =1;
       role.description="ADMIN"
     }else{
       role.id = 2;
       role.description = "USER";
     }

     let user = new User();
     user.name = name;
     user.lastname = lastname;
     user.email = email;
     user.role = role;
     user.password = bcrypt.hashSync(password, 8);;

     const errors = await validate(user);
     if(errors.length>0){
       res.status(400).send(errors);
       return;
     }

     const userRespository = getRepository(User);
     try{
       await userRespository.save(user);
       res.status(201).send("User created succesfully");
     }catch(error){
       res.status(409).send(error);
       return;
     }

     
   };

   static editUser = async (req: Request, res: Response) => {


     //Get the id from the url
     const id = req.params.id;
     
     //Get values from the body
     const { name, lastname, roleId } = req.body;

     let role = new Role();

     if(roleId===1){
       role.id =1;
       role.description="ADMIN"
     }else{
       role.id = 2;
       role.description = "USER";
     }

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
     user.role = role;
     const errors = await validate(user);
     if(errors.length > 0){
       res.status(400).send(errors);
       return;
     }
     //try to safe, if fails, that means username is already in use
     try{
       await userRespository.save(user);
       res.status(504).send();
     }catch(e){
       res.status(409).send("Something went wrong"+e);
       return;
     }
   };

   static deleteUser = async (req: Request, res: Response)=> {
     //Get the id from the url
     const id = req.params.id;
     const userRespository = getRepository(User);
     let user: User;
     try{
       user = await userRespository.findOneOrFail(id);
       userRespository.delete(id);
       res.status(204).send("User deleted");
     }catch(error){
       res.status(404).send("User not found");
       return;
     }
   };
 }

 export default userController;
