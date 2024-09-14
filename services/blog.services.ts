import BlogRepo from "../repository/blog.repo";
import { BlogInterface } from "../types";
import { BlogError } from "../error";

const blogRepo = new BlogRepo();

export const createBlogService = async (blog: BlogInterface) => {
  if (blog.likeCount !== 0) {
    throw new BlogError("likeCount must be 0");
  }

  const newBlog = await blogRepo.createBlog(blog);

  return newBlog;
};

export const deleteBlogService = async (blogId: string) => {
  if (!blogId) {
    throw new BlogError("blogId is required to delete a blog");
  }

  await blogRepo.deleteBlog(blogId);
};

export const likeBlogService = async (blogId: string, userId: string) => {
  if (!blogId) {
    throw new BlogError("blogId is required to like a blog");
  }

  if (!userId) {
    throw new BlogError("userId is required to like a blog");
  }

  const doesUserLikedBlog = await blogRepo.getBlogIfUserLikedIt(blogId, userId);

  if (doesUserLikedBlog) {
    throw new BlogError("user already like this blog");
  }

  const blog = await blogRepo.likeBlog(blogId, userId);

  return blog;
};

export const dislikeBlogService = async (blogId: string, userId: string) => {
  if (!blogId) {
    throw new BlogError("blogId is required to dislike a blog");
  }

  if (!userId) {
    throw new BlogError("userId is required to dislike a blog");
  }

  const doesUserLikedBlog = await blogRepo.getBlogIfUserLikedIt(blogId, userId);

  if (!doesUserLikedBlog) {
    throw new BlogError("user never liked this blog");
  }

  const blog = await blogRepo.dislikeBlog(blogId, userId);

  return blog;
};

export const getBlogByIdService = async (blogId: string) => {
  if (!blogId) {
    throw new BlogError("blogId is required to get a blog");
  }

  const blog = await blogRepo.getBlogById(blogId);

  return blog;
};

export const updateBlogService = async (
  blog: Omit<BlogInterface, "id">,
  targetBlogId: string
) => {
  if (!blog) {
    throw new BlogError("provide something to update");
  }

  if (!targetBlogId) {
    throw new BlogError("target blogId should be provided");
  }

  const updatedBlog = blogRepo.updateBlog(blog, targetBlogId);

  return updatedBlog;
};

export const getTopBlogsService = async () => {
  const limit = 5;
  const blogs = await blogRepo.getTopBlogs(limit);
  return blogs;
};

export const getBlogPageService = async (page: number) => {
  if (page < 0) {
    throw new BlogError("page can never be less than zero");
  }

  const limit = 5;
  const skip = (page - 1) * limit;

  const blogs = await blogRepo.getBlogPage(skip, limit);
  return blogs;
};
