import app from "../app";
import User from "../schema/user.schema";
import request from "supertest";
import connect from "../lib/connect";
import mongoose from "mongoose";
import Blog from "../schema/blog.schema";
import { UserInterface, BlogInterface } from "../types";
import { StatusCodes } from "http-status-codes";

const userPeterParker: Omit<UserInterface, "createdAt" | "updatedAt"> = {
  email: "peter@gmail.com",
  firstName: "peter",
  lastName: "parker",
  password: "peter123",
};

let authToken: string;

beforeAll(async () => {
  await connect();

  await User.deleteMany({});
  await Blog.deleteMany({});

  await request(app)
    .post("/signup")
    .send({
      ...userPeterParker,
    });

  const res = await request(app).post("/login").send({
    email: userPeterParker.email,
    password: userPeterParker.password,
  });

  const data = res.body as { token: string; user: UserInterface };
  authToken = data.token;

  const newBlogDocument = await Blog.create({
    title: "my blog",
    content: "content of my blog",
  });
});

describe("Create blog", () => {
  it("Should create blog", async () => {
    const res = await request(app)
      .post("/createBlog")
      .set("Authorization", authToken)
      .send({
        title: "new blog",
        content: "blog content",
      });

    expect(res.statusCode).toBe(StatusCodes.CREATED);
  });
});

describe("Update blog", () => {});

afterAll(async () => {
  await mongoose.connection.close();
});
