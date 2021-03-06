import { Router } from 'express';
import userController  from '../controllers/userController';
import { checkJwt } from '../middlewares/checkJwt';
import { checkRole } from '../middlewares/checkRole';

const router = Router();

//Get all users
router.get("/", userController.listAll);

//Get one user
router.get("/:id([0-9]+)", [checkJwt, checkRole(["ADMIN"])], userController.getOneById);

//Create a new user
router.post("/", [checkJwt, checkRole(["ADMIN"])], userController.newUser);

//Edit one user
router.patch("/:id", [checkJwt, checkRole(["ADMIN"])], userController.editUser);

//Delete one user
router.delete("/del/:id", [checkJwt, checkRole(["ADMIN"])], userController.deleteUser);

export default router;
