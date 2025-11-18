import type { Request, Response } from "express";
import { Types } from 'mongoose'
import { signToken, verifyToken } from "../utils/JwtGenerate";
import { hashPassword, verifyPassword } from "../utils/hash";
import Users from "../models/user.model";
import { OperationCanceledException } from "typescript";

export const COOKIE_NAME = "authorization";

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

    const savedUser = await newUser.save();
    let userId: string;

    if (typeof (savedUser as any).id === "string" && (savedUser as any).id) {
      userId = (savedUser as any).id;
    } else if (Types.ObjectId.isValid(savedUser._id as any)) {
      userId = (savedUser._id as Types.ObjectId).toHexString();
    } else {
      userId = String(savedUser._id);
    }

    const accessToken = signToken(newUser.email,userId);

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
    let userId: string;

    if (typeof (user as any).id === "string" && (user as any).id) {
      userId = (user as any).id;
    } else if (Types.ObjectId.isValid(user._id as any)) {
      userId = (user._id as Types.ObjectId).toHexString();
    } else {
      userId = String(user._id);
    }


    const token = signToken(user.email,userId);
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
