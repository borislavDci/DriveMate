import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
import cookieParser from "cookie-parser";
import listingRoute from "./routes/listingRoute.js";

dotenv.config();

const { PORT, DB_STRING } = process.env;

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/listing", listingRoute);

mongoose
  .connect(DB_STRING)
  .then(() => console.log(`database is connected`))
  .catch((err) => {
    console.log(`error while connecting to the database ${err}`);
  });

app.listen(PORT, () => {
  console.log("Server is running");
});
