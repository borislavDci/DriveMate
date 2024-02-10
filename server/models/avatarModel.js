import mongoose from "mongoose";

const ObjectId = mongoose.Schema.Types.ObjectId;

const avatarSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  path: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Avatar = mongoose.model("avatar", avatarSchema, "avatars");

export default Avatar;
