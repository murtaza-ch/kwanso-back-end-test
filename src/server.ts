import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { config } from "./config/config";
import userRoutes from "./routes/user";
import taskRoutes from "./routes/user";

const app = express();

mongoose
  .connect(config.mongo.url!)
  .then(() => {
    console.log("Connected to DB!");
    StartServer();
  })
  .catch((error) => {
    console.log(error);
  });

const StartServer = () => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors());
  // Routes
  app.use("/user", userRoutes);
  app.use("/task", taskRoutes);

  app.listen(config.server.port, () => {
    console.log(`Server listening at PORT: ${config.server.port}`);
  });
};
