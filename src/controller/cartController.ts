import { Request, Response } from "express";
export const getCart = (req: Request, res: Response) => {
  res.status(200).json("you can view your cart");
};
