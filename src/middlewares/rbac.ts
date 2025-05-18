import { Request, Response, NextFunction } from "express";
import { RequestHandler } from "express";

export type Role = "admin" | "vet";

const authorize = (allowedRoles: Role[]): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const role = req.header("x-user-role") as Role | undefined;
    if (!role) {
      res.status(403).json({ message: "Missing role" });
      return;
    }
    if (!allowedRoles.includes(role)) {
      res.status(403).json({ message: "Forbidden: insufficient permissions" });
      return;
    }
    next();
  };
};

export default authorize;
