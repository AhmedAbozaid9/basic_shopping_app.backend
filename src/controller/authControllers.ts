import { Request, Response } from "express";
import User from "../models/User";
import { sign } from "jsonwebtoken";
import bcrypt from "bcrypt";

// Define the interface for the request body
interface SignupRequestBody {
  name: string;
  email: string;
  password: string;
}

interface SigninRequestBody {
  email: string;
  password: string;
}

export const signupController = async (req: Request, res: Response) => {
  const { name, email, password }: SignupRequestBody = req.body;
  try {
    const user = await User.create({ name, email, password });
    const token = sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET!
    );
    res.status(201).json({
      success: true,
      user: { name: user.name, email: user.email },
      token,
    });
  } catch (error) {
    console.log(process.env.JWT_SECRET);
    res.status(500).json({ message: error });
  }
};

export const signInController = async (req: Request, res: Response) => {
  const { email, password }: SigninRequestBody = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(401).json({ message: "Invalid credentials" });
    } else {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        res.status(401).json({ message: "Invalid credentials" });
      } else {
        const token = sign(
          { userId: user.id, email: user.email },
          process.env.JWT_SECRET!
        );
        res.status(200).json({
          success: true,
          user: { name: user.name, email: user.email },
          token,
        });
      }
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
