import type { Request, Response } from "express";
import { signToken, verifyToken } from "../utils/JwtGenerate";
import { hashPassword, verifyPassword } from "../utils/hash";
import Users from "../models/user.model";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const user = await Users.findOne({ email: req.body.email });

    if (user) {
      res.json({ message: "User already exists !" }).status(401);
      return;
    }

    const hashedPass = await hashPassword(req.body.password);

    let newUser = new Users({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });

    await newUser.save();

    let accessToken = signToken(newUser.email);

    res.cookie("Authorization", accessToken, { httpOnly: true });

    res.json({
      username: newUser.username,
      email: newUser.email,
    });
  } catch (error) {
    res.json({ message: "Error Registering the user !", Error: error });
    return;
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const user = await Users.findOne({ email: req.body.email });

    if (!user) {
      res.json("User Don't Exist !").status(404);
      return;
    }

    const givenPassword = req.body.password;

    const passwordVerification = await verifyPassword(
      givenPassword,
      user.password
    );

    if (!passwordVerification) {
      res.json({ message: "Invalid Username or Password !" }).status(400);
      return;
    }

    let token = signToken(user.email);
    res.header("authorization", token);
    res.json({ message: "Login successful !" });
  } catch (error) {
    res.json({ message: "Error Login the user !", Error: error });
    return;
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  try {
    res
      .clearCookie("Authorizatioin")
      .json({ message: "Log out successful !! " })
      .status(200);
  } catch (error) {
    res.json(error);
    return;
  }
};
