import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/User";
import { Request, Response, NextFunction } from "express";

type UserType = {
  id: number;
  name: string;
  email: string;
};

interface AuthRequest extends Request {
  user: UserType | null;
}

const requireAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Not authorized" });
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, process.env.JWT_SECRET!, async (err, payload) => {
    if (err) {
      return res.status(401).json({ error: "Not authorized" });
    }
    const { userId } = payload as JwtPayload;
    const user = await User.findOne({ where: { id: userId } });

    req.user = user;
    next();
  });
};

export default requireAuth;
