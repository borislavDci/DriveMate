import express from "express";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwtSignIn from "../helpers/jwt.js";

const authRoute = express.Router();
const { isProduction } = process.env;

authRoute.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  console.log(username, password)
  if (!user) {
    return res
      .status(401)
      .json({ status: "error", message: `Invalid Credentials.` });
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return res
      .status(401)
      .json({ status: "error", message: `Invalid Credentials.` });
  }
  const token = jwtSignIn(user);
  res
    .cookie("jwt", token, { httpOnly: true, secure: isProduction })
    .status(200)
    .json({ status: "success" });
});

authRoute.post("/logout", (req, res) => {
  res.clearCookie("jwt").json({ status: `success` });
});

export default authRoute;
