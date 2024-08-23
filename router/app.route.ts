import { Router } from "express";

import { greeting } from "../controllers/greeting";

import login from "../controllers/auth/login";
import signup from "../controllers/auth/signup";

import getUser from "../controllers/user/getUser";
import updateUser from "../controllers/user/updateUser";

import authMiddelWare from "../middlewares/auth";

import createBlog from "../controllers/blog/createBlog";
import updateBlog from "../controllers/blog/updateBlog";
import likeBlog from "../controllers/blog/likeBlog";
import dislikeBlog from "../controllers/blog/dislikeBlog";
import getBlogById from "../controllers/blog/getBlogById";
import getBlogPage from "../controllers/blog/getBlogPage";
import deleteBlog from "../controllers/blog/deleteBlog";

import makeComment from "../controllers/comment/makeComment";
import updateComment from "../controllers/comment/updateComment";
import getCommentPage from "../controllers/comment/getCommentPage";
import deleteComment from "../controllers/comment/deleteComment";
import getTopBlogs from "../controllers/blog/getTopBlogs";

const router = Router();

router.get("/", greeting);

router.post("/signup", signup);
router.post("/login", login);

router.use(authMiddelWare);

router.get("/getUser/:id", getUser);
router.post("/updateUser/:id", updateUser);

router.post("/createBlog", createBlog);
router.post("/updateBlog/:id", updateBlog);
router.get("/getBlog/:id", getBlogById);
router.get("/getBlogPage", getBlogPage);
router.post("/deleteBlog", deleteBlog);
router.get("/getTopBlogs", getTopBlogs);

router.post("/likeBlog/:id", likeBlog);
router.post("/dislikeBlog/:id", dislikeBlog);

router.post("/makeComment", makeComment);
router.post("/updateComment/:id", updateComment);
router.get("/getCommentPage", getCommentPage);
router.post("/deleteComment", deleteComment);

export default router;
