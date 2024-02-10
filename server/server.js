import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
import cookieParser from "cookie-parser";
import listingRoute from "./routes/listingRoute.js";
import uploadImages from "./routes/uploadImages.js";
import ownerDashboardRouter from "./routes/ownerDashboard.js";
import bookingRouter from "./routes/bookingRoute.js";
import dashboardRouter from "./routes/dashborad.js";
import enumsRouter from "./routes/enumsRoute.js";
//imports for locating our directory (for deployment)
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

dotenv.config();

const __filename = fileURLToPath(import.meta.url); // get the current file location of server.js
const __dirname = dirname(__filename); //extract directory from that location.
const { PORT, DB_STRING } = process.env;

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://192.168.1.13:5173"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/listing", listingRoute);
app.use("/api/upload", uploadImages);
app.use("/api/ownerdashboard/", ownerDashboardRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/avatars", express.static("./avatars"));
app.use("/api/pimages", express.static("./listingimages"));
app.use("/api/booking", bookingRouter);
app.use("/api/enums", enumsRouter);
mongoose
  .connect(DB_STRING)
  .then(() => console.log(`database is connected`))
  .catch((err) => {
    console.log(`error while connecting to the database ${err}`);
  });

app.use(express.static(path.join(__dirname, "../client/dist")));
//any other request made serve the index.html of our production build frontend.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.listen(PORT, () => {
  console.log("Server is running");
});
