import { NextFunction } from "express";

export const isAuthenticated = (req: any, res: any, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  next();
};
