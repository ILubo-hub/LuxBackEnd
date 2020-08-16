import Express from 'express';
import { CreateUser } from '../controllers/userController.js';
import pkg from "express-validator";
const { body, validationResult, check } = pkg;

export const createUser = Express.Router().post('/', [
    check('name', 'The name is required').not().isEmpty(),
    check('lastname', 'The lastname is required').not().isEmpty(),
    check('email', 'The email is required').not().isEmpty(),
    check('email', 'Your email is not valid').isEmail(),
    check('password', 'Your password must have al least 6').isLength({min: 6})
], CreateUser);

