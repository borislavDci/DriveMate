import { StatusCodes } from "http-status-codes";
import Avatar from "../models/avatarModel.js";
import User from "../models/userModel.js";
import { fileURLToPath } from "url";
import path from "path";
import sizeOf from "image-size";
import { unlink } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createAvatar = async (req, res) => {
  try {
    const dimensions = sizeOf(req.file.path);
    const maxWidth = 1000;
    const maxHeight = 1000;

    if (dimensions.width > maxWidth || dimensions.height > maxHeight) {
      throw new Error(
        `Image dimensions exceed the allowed size(${maxHeight}pxX${maxWidth}px)`
      );
    }

    const newFile = await Avatar.create({
      userId: req.tokenId,
      path: req.file.filename,
    });
    const existingUser = await User.findById(req.tokenId);

    const pathToDelete = existingUser.avatarURL;

    existingUser.avatarURL = newFile.path;
    await existingUser.save();
    unlink(path.join(__dirname, `../avatars/${pathToDelete}`), (err) => {
      console.log(err);
    });

    return res.status(StatusCodes.CREATED).json({ status: `success` });
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: error.message || "Something went wrong" });
  }
};

export { createAvatar };
