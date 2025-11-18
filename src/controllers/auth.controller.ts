import type { Request, Response } from "express";
import { signToken, verifyToken } from "../utils/JwtGenerate";
import { hashPassword, verifyPassword } from "../utils/hash";
import Users from "../models/user.model";

const COOKIE_NAME = "authorization";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, username, password } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({ message: "username, email and password required" });
    }

    const existing = await Users.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPass = await hashPassword(password);

    const newUser = new Users({
      username,
      email,
      password: hashedPass,
    });

    await newUser.save();

    const accessToken = signToken(newUser.email,newUser._id);

    res.cookie(COOKIE_NAME, accessToken, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      // sameSite: "lax"
    });

    return res.status(201).json({
      message: "User registered successfully",
      username: newUser.username,
      email: newUser.email,
    });
  } catch (error) {
    console.error("Error in registerUser:", error);
    return res.status(500).json({ message: "Error registering user", error: String(error) });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "email and password required" });
    }

    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const passwordVerification = await verifyPassword(password, user.password);
    if (!passwordVerification) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = signToken(user.email,user._id);
    res.cookie(COOKIE_NAME, token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      // sameSite: "lax"
    });

    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error in loginUser:", error);
    return res.status(500).json({ message: "Error logging in user", error: String(error) });
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  try {
    res.clearCookie(COOKIE_NAME);
    return res.status(200).json({ message: "Log out successful" });
  } catch (error) {
    console.error("Error in logoutUser:", error);
    return res.status(500).json({ message: "Error logging out", error: String(error) });
  }
};
