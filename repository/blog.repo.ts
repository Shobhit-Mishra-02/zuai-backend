import Blog from "../schema/blog.schema";
import { BlogInterface } from "../types";

class BlogRepo {
  construct() {}

  async createBlog(blog: BlogInterface) {
    const newBlog = await Blog.create(blog);
    return newBlog;
  }

  async getBlogById(id: string) {
    const blog = await Blog.findById(id);
    return blog;
  }

  async deleteBlog(id: string) {
    await Blog.findByIdAndDelete(id);
  }

  async getBlogIfUserLikedIt(blogId: string, userId: string) {
    const blog = await Blog.findOne({
      _id: blogId,
      usersLiked: userId,
    });

    return blog;
  }

  async likeBlog(blogId: string, userId: string) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $inc: { likeCount: 1 },
        $push: { usersLiked: userId },
      },
      {
        new: true,
      }
    );

    return blog;
  }

  async dislikeBlog(blogId: string, userId: string) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $inc: { likeCount: -1 },
        $pull: { usersLiked: userId },
      },
      {
        new: true,
      }
    );

    return blog;
  }

  async updateBlog(blog: Omit<BlogInterface, "id">, blogId: string) {
    const newBlog = await Blog.findByIdAndUpdate(
      blogId,
      {
        ...blog,
      },
      { new: true }
    );

    return newBlog;
  }

  async getBlogPage(skip: number = 0, limit: number = 5) {
    const blogs = await Blog.find()
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 });

    return blogs;
  }

  async getTopBlogs(limit: number = 5) {
    const blogs = await Blog.find()
      .populate("author")
      .sort({ likeCount: -1 })
      .limit(limit)
      .exec();

    return blogs;
  }
}

export default BlogRepo;
