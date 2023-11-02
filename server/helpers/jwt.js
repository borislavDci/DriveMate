import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const { JWT_SECRET } = process.env;

function jwtSignIn(user) {
  console.log(JWT_SECRET);

  if (!user) return;
  const token = jwt.sign({ id: user._id }, JWT_SECRET, {
    expiresIn: 86400, // Token expires in 24 hours (in seconds)
  });
  return token;
}

export default jwtSignIn;
