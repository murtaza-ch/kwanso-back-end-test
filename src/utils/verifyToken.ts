import { Schema } from "mongoose";
import jwt from "jsonwebtoken";

export interface Token extends Object {
  id: Schema.Types.ObjectId;
  expiresIn: number;
}

export const verifyToken = async (
  token: string
): Promise<jwt.VerifyErrors | Token> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET as jwt.Secret, (err, payload) => {
      if (err) return reject(err);

      resolve(payload as Token);
    });
  });
};
