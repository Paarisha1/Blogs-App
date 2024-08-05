import express from "express";
const blogRouter = express.Router();
import { getAllBlogs,addBlog,updateBlog,getBlogById,deleteBlogById,getBlogsByUserId } from "../controllers/blog-controller.js"


blogRouter.get("/", getAllBlogs);
blogRouter.post("/add",addBlog);
blogRouter.put("/update/:id",updateBlog);
blogRouter.get("/:id",getBlogById)
blogRouter.delete("/:id",deleteBlogById);
blogRouter.get("/user/:id",getBlogsByUserId);
export default blogRouter;