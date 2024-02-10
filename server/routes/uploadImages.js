import express from "express";
import { createAvatar } from "../controllers/UploadController.js";
import verifyToken from "../middleware/auth.js";
import { uploadAvatar } from "../helpers/multer.js";

const uploadImages = express.Router();

//endpoint to upload file + store meta info into database
uploadImages.post(
  "/avatar",
  verifyToken,
  uploadAvatar.single("image"),
  createAvatar
);

export default uploadImages;
