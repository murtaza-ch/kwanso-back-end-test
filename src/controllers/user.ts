import { RequestUserAuth } from "./../middleware/auth";
import { Request, Response } from "express";
import { createToken } from "../utils/createToken";
import User from "../models/User";

const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const isExist = await User.findOne({ email });

    if (isExist) {
      return res
        .status(403)
        .json({ message: "User with email already exist!" });
    }

    const user = new User({
      email,
      password,
    });
    const { _id, email: userEmail } = await user.save();
    const token = createToken(_id);

    return res.status(201).json({ token, user: { id: _id, email: userEmail } });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(403)
        .json({ message: "Unable to find user with that email address" });
    }

    if (await user.isValidPassword(password)) {
      const token = createToken(user._id);
      return res.status(201).json({ jwt: token });
    } else {
      return res.status(400).json({ message: "Invalid Credentials!" });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const getUser = async (req: RequestUserAuth, res: Response) => {
  try {
    return res.status(201).json({ ...req.user._doc });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export default { register, login, getUser };
