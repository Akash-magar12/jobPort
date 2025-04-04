import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConnect from "./Database/db.connection.js";
import { routes } from "./Routes/user.routes.js";
import cookieParser from "cookie-parser";

dotenv.config();
const PORT = process.env.PORT || 500;

const app = express();
(async () => {
  await dbConnect();
  app.listen(PORT, () => {
    console.log("server ia loading");
  });
})();
app.use(
  cors({
    origin: "https://jobport-kvn5.onrender.com",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);
app.use(cookieParser());
app.use(express.json({ extended: true, limit: "100kb" }));
app.use(express.urlencoded({ extended: true, limit: "100kb" }));

app.use("/api", routes);
app.use((err, req, res, next) => {
  const status = err.statuscode || 500;
  const message = err.message || "internal server error";
  console.log(`app failed with status ${status} and error ${message}`);
});
