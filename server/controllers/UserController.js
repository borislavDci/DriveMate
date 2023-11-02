import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import StatusCodes from "http-status-codes";

const { SALT } = process.env;

const getUser = (req, res) => {};

const createUser = async (req, res) => {
  const { username, password, firstName, lastName, email } = req.body;
  const hashedPassword = await bcrypt.hash(password, Number(SALT));
  try {
    const newUser = await User.create({
      username,
      password: hashedPassword,
      firstName,
      lastName,
      email,
    });

    return res
      .status(StatusCodes.CREATED)
      .send({ status: "success", data: newUser });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send({ status: "error", message: "Username already in use" });
    }

    return res
      .status(StatusCodes.BAD_REQUEST)
      .send({ status: "error", message: error });
  }
};

const updateUser = (req, res) => {};

const deleteUser = (req, res) => {};

export { getUser, createUser, updateUser, deleteUser };
