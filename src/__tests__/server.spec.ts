import app from "../app";
import request from "supertest";

describe("GET /api/", () => {
  it("server Should Be Healthy", async () => {
    const response = await request(app).get("/api");
    expect(response.status).toBe(200);
    expect(response.text).toMatch(/Live/i);
  });
});
