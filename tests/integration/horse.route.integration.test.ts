import request from "supertest";
import express from "express";
import horseRoutes from "../../src/features/horse/horse.route";

const app = express();
app.use(express.json());
app.use("/api/v1", horseRoutes);

describe("GET /api/v1/horses RBAC", () => {
  it("should allow admin", async () => {
    const res = await request(app)
      .get("/api/v1/horses")
      .set("x-user-role", "admin");

    expect([200, 404]).toContain(res.statusCode);
  });

  it("should not allow vet", async () => {
    const res = await request(app)
      .post("/api/v1/horses")
      .set("x-user-role", "vet");

    expect(res.statusCode).toBe(403);
    expect(res.body).toEqual({
      message: "Forbidden: insufficient permissions",
    });
  });

  it("should not allow missing role", async () => {
    const res = await request(app).get("/api/v1/horses");

    expect(res.statusCode).toBe(403);
    expect(res.body).toEqual({
      message: "Missing role",
    });
  });
});
