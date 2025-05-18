import authorize, { Role } from "../../src/middlewares/rbac";
import { Request, Response, NextFunction } from "express";

describe("authorize middleware", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: jest.Mock;

  beforeEach(() => {
    req = { header: jest.fn() };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    next = jest.fn();
  });

  it("should call next if the role is allowed", () => {
    (req.header as jest.Mock).mockReturnValue("admin");

    const middleware = authorize(["admin", "vet"]);
    middleware(req as Request, res as Response, next as NextFunction);
    expect(next).toHaveBeenCalled();
  });

  it("should return 403 if the role is not allowed", () => {
    (req.header as jest.Mock).mockReturnValue("vet");
    const middleware = authorize(["admin"]);
    middleware(req as Request, res as Response, next as NextFunction);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      message: "Forbidden: insufficient permissions",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("should return 403 if the role is missing", () => {
    (req.header as jest.Mock).mockReturnValue(undefined);
    const middleware = authorize(["admin"]);
    middleware(req as Request, res as Response, next as NextFunction);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      message: "Missing role",
    });
    expect(next).not.toHaveBeenCalled();
  });
});
