import app from "../app";
import request from "supertest";
import connect from "../lib/connect";
import mongoose from "mongoose";
import User from "../schema/user.schema";
import Blog from "../schema/blog.schema";
import { UserInterface } from "../types";
import { StatusCodes } from "http-status-codes";

const userPeterParker: Omit<UserInterface, "createdAt" | "updatedAt"> = {
  email: "peter@gmail.com",
  firstName: "peter",
  lastName: "parker",
  password: "peter123",
};

beforeAll(async () => {
  await connect();

  await User.deleteMany({});
  await Blog.deleteMany({});
});

describe("Health checkup", () => {
  test("GET /", async () => {
    const res = await request(app).get("/");

    expect(res.body).toEqual({ message: "Hi" });
  });
});

describe("Signup", () => {
  it("Should signup with all details", async () => {
    const res = await request(app)
      .post("/signup")
      .send({
        ...userPeterParker,
      });

    expect(res.statusCode).toBe(201);
  });

  it("Should not signup without password", async () => {
    const res = await request(app)
      .post("/signup")
      .send({
        ...userPeterParker,
        password: undefined,
      });

    expect(res.statusCode).toBe(500);
  });

  it("Should not signup without email", async () => {
    const res = await request(app)
      .post("/signup")
      .send({
        ...userPeterParker,
        email: undefined,
      });

    expect(res.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
  });

  it("Should not signup without firstName", async () => {
    const res = await request(app)
      .post("/signup")
      .send({
        ...userPeterParker,
        email: undefined,
      });

    expect(res.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
  });
});

describe("Login", () => {
  it("Should login with correct credentials", async () => {
    const res = await request(app).post("/login").send({
      email: userPeterParker.email,
      password: userPeterParker.password,
    });

    expect(res.statusCode).toBe(StatusCodes.OK);

    const body = res.body as { [key: string]: any };
    expect(Object.keys(body).includes("token")).toBeTruthy();
    expect(Object.keys(body).includes("user")).toBeTruthy();
  });

  it("Should not login with wrong credentials are provided", async () => {
    const res = await request(app).post("/login").send({
      email: userPeterParker.email,
      password: "wrongpassword",
    });

    expect(res.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
