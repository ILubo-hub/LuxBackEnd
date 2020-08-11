import User from "../entities/user";
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import { getConnection } from "typeorm";

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

  try {
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        { name: name, lastanme: lastname, email: email, password: password },
      ])
      .execute();

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
