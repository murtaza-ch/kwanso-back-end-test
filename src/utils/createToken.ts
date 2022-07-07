import jwt from "jsonwebtoken";
import { config } from "../config/config";

export const createToken = (id: string): string => {
  return jwt.sign({ id }, config.secret, { expiresIn: "7d" });
};
