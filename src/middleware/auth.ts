import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { Token, verifyToken } from "./../utils/verifyToken";
import User from "../models/User";

export interface RequestUserAuth extends Request {
  user?: any;
}

export const isAuth = async (
  req: RequestUserAuth,
  res: Response,
  next: NextFunction
) => {
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorised" });
  }

  const token = bearer.split("Bearer ")[1].trim();

  try {
    const payload: Token | jwt.JsonWebTokenError = await verifyToken(token);

    if (payload instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "Unauthorised" });
    }

    const user = await User.findById(payload.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Unauthorised" });
    }

    req.user = user;

    return next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorised" });
  }
};
