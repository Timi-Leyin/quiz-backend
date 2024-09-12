import app from "../../app";
import request from "supertest";
import { accessToken } from "../auth/auth.spec";
import { getRandomStoreInfo } from "../../helpers/random-data";

describe("Profile", () => {
  it("Should fail if there's no access token", async () => {
    const response = await request(app).get("/api/profile").expect(401);
    expect(response.status).toBe(401);
  });

  // it("Should create a store for the logged in user", async () => {
  //   const response = await request(app)
  //     .post("/api/profile/create-store")
  //     .send(getRandomStoreInfo())
  //     .set({
  //       authorization: `Bearer ${accessToken}`,
  //     })
  //     .expect(201);
  //   expect(response.status).toBe(201);
  // });

  it("Should get user user profile", async () => {
    const response = await request(app)
      .get("/api/profile")
      .set({
        authorization: `Bearer ${accessToken}`,
      })
      .expect(200);
    expect(response.body.data.email).toBeDefined();
    expect(response.status).toBe(200);
  });
});
