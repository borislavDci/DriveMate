import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import StatusCodes from "http-status-codes";

const { SALT } = process.env;

const getUser = async (req, res) => {
  const user = await User.findById(req.tokenId).select("-password").exec();
  if (!user)
    return res
      .status(StatusCodes.NOT_FOUND)
      .send({ status: "error", message: "User not found" });
  res.status(StatusCodes.OK).send({ status: "success", data: user });
};

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

const updateUser = async (req, res) => {
  const { username, firstName, lastName, email } = req.body;
  try {
    await User.findByIdAndUpdate(req.tokenId, {
      username,
      firstName,
      lastName,
      email,
    });
    return res.status(StatusCodes.OK).send({ status: "success" });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ status: "error", message: error });
  }
};

const deleteUser = (req, res) => {};

export { getUser, createUser, updateUser, deleteUser };
