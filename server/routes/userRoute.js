import express from "express";
import {
  createUser,
  getUser,
  updateUser,
} from "../controllers/UserController.js";
import { body } from "express-validator";
import expressValidator from "../middleware/expressValidator.js";
import verifyToken from "../middleware/auth.js";

const userRoute = express.Router();

const createUserValidator = [
  body(["username", "password", "firstName", "lastName", "email"]).notEmpty(),
  expressValidator,
];

userRoute
  .route("/")
  .get(verifyToken, getUser)
  .post(createUserValidator, createUser)
  .patch(verifyToken, updateUser)
  .delete();

export default userRoute;
