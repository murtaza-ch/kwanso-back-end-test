import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT
  ? Number(process.env.SERVER_PORT)
  : 5000;
const MONGO_URL = process.env.MONGO_URL;

const JWT_SECRET = process.env.JWT_SECRET as jwt.Secret;

export const config = {
  secret: JWT_SECRET,
  mongo: {
    url: MONGO_URL,
  },
  server: {
    port: SERVER_PORT,
  },
};
