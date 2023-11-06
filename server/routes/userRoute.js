import express from "express";
import { createUser, getUser } from "../controllers/userController.js";
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
  .put()
  .delete();

export default userRoute;
