import express from "express";
import { createUser } from "../controllers/userController.js";
import { body } from "express-validator";
import expressValidator from "../middleware/expressValidator.js";

const userRoute = express.Router();

const postValidator = [
  body(["username", "password", "firstName", "lastName", "email"]).notEmpty(),
  expressValidator,
];

userRoute.route("/").get().post(postValidator, createUser).put().delete();

export default userRoute;
