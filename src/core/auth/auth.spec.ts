import request from "supertest";
import app from "../../app";
import { getRandomUserInfo } from "../../helpers/random-data";
import { decodeToken } from "../../helpers/token";

const user = getRandomUserInfo();
let accessToken: string;
describe("Authentication", () => {
  it("[LOGIN] Should Register a user successfully and contain access Token", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send(user)
      .expect(201);
    expect(response.body.accessToken).not.toBeUndefined();
  });

  it("[LOGIN] Should login a user successfully and contain access Token", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send(user)
      .expect(200);
    accessToken = response.body.accessToken;
    expect(response.body.accessToken).not.toBeUndefined();
  });

  it("[LOGIN] Should fail when required field are not filled", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      // .send(user)
      .expect(400);
    expect(response.body.errors).not.toBeUndefined();
  });
  it("[REGISTER] Should fail when required field are not filled", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      // .send(user)
      .expect(400);
    expect(response.body.errors).not.toBeUndefined();
  });
});

describe("Token generation & expiration", () => {
  it("Should ensure access token has the right user information", async () => {
    const decoded = await decodeToken(accessToken ?? "");
    expect(decoded.user?.email).toBe(user.email);
  });
});

export {user as randomUser, accessToken}