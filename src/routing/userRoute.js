import Express from 'express';
import { CreateUser } from '../controllers/userController';
import { body, validationResult, check } from "express-validator";

export const createUser = Express.Router().post('/', [
    check('name', 'The name is required').not().isEmpty(),
    check('lastname', 'The lastname is required').not().isEmpty(),
    check('email', 'The email is required').not().isEmpty(),
    check('email', 'Your email is not valid').isEmail(),
    check('password', 'Your password must have al least 6').isLength({min: 6}),
    check('password', 'Your password must have be alphanumeric').isAlphanumeric("utf-8")
], CreateUser);

