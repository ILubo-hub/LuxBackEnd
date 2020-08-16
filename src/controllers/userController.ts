import {User} from "../entities/user.js";
import pkg from "express-validator";
import bcrypt from "bcrypt";
import pkgTy from "typeorm";
const { body, validationResult } = pkg;
const { getConnection } = pkgTy;

export const CreateUser = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({
      error: error.array(),
    });
  }
  let { name, lastname, email, password } = req.body;
  const hashpassword = bcrypt.hashSync(password, 12);
  password = hashpassword;

  //const user = new User;

  try {

    const user = await User.create({
        name,
        lastname,
        email,
        password,
      }).save();
      return user;

   /*  await getConnection()
     .createQueryBuilder()
     .insert()
     .into(user)
     .values([
         {name: name, lastname: lastname, email: email, password: password}
     ])
     .execute();*/
    return res.status(200).json({
      msj: "Succesfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      msj: "Error registering user",
    });
  }
};
