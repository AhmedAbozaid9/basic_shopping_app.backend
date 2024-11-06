import { Request, Response } from "express";
import User from "../models/User";

// Define the interface for the request body
interface SignupRequestBody {
  name: string;
  email: string;
  password: string;
}

export const signupController = async (req: Request, res: Response) => {
  const { name, email, password }: SignupRequestBody = req.body;
  try {
    await User.create({ name, email, password });
    res.status(201).json({ name, email, password });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
