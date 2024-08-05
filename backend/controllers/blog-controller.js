import mongoose from "mongoose";
import Blog from "../model/Blog.js";
import User from "../model/User.js";

export const getAllBlogs = async (req, res, next) => {
    let blogs;
    try {
        blogs = await Blog.find().populate("user");
    }
    catch (err) {
        console.log(err);
    }
    if (!blogs) {
        return res.status(404).json({ message: "No blogs found" });
    }
    return res.status(200).json({ blogs });
}


export const addBlog = async (req, res, next) => {
    const { title, description, image, user } = req.body;
    const blog = new Blog({
      title,
      description,
      image,
      user,
    });
  
    let existingUser;
    try {
      existingUser = await User.findById(user);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Fetching user failed' });
    }
  
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }
  
    try {
      const session = await mongoose.startSession();
      session.startTransaction();
      await blog.save({ session });
      existingUser.blogs.push(blog);
      await existingUser.save({ session });
      await session.commitTransaction();
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Creating blog failed' });
    }
  
    return res.status(201).json({ blog });
}; 


export const updateBlog = async (req, res, next) => {
    const { title, description } = req.body;
    const blogId = req.params.id;
    let blog;

    try {
        blog = await Blog.findByIdAndUpdate(
            blogId,
            { title, description },
            { new: true }
        );
    } catch (err) {
        console.error(err);
    }

    if (!blog) {
        return res.status(404).json({ message: 'Unable to update the blog' });
    }

    return res.status(200).json({ blog });
};

export const getBlogById = async (req, res, next) => {
  const blogId = req.params.id;

  console.log('Received blog ID:', blogId);

  if (!mongoose.Types.ObjectId.isValid(blogId)) {
    console.error('Invalid blog ID format:', blogId);
    return res.status(400).json({ message: 'Invalid blog ID format' });
  }

  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      console.log('Blog not found with ID:', blogId);
      return res.status(404).json({ message: 'Blog not found' });
    }
    return res.status(200).json({ blog });
  } catch (err) {
    console.error('Error fetching blog:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};




export const deleteBlogById = async (req, res, next) => {
    const blogId = req.params.id;
    let blog;

    try {
        blog = await Blog.findById(blogId).populate('user');
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        await Blog.findByIdAndDelete(blogId);

        if (blog.user) {
            blog.user.blogs.pull(blog);
            await blog.user.save();
        }
    } catch (err) {
        console.error('Error deleting blog:', err);
        return res.status(500).json({ message: 'Error deleting blog' });
    }

    return res.status(200).json({ message: 'Blog successfully deleted' });
};

export const getBlogsByUserId = async (req, res, next) => {
    const userId = req.params.id;
    let userBlogs;
  
    try {
      userBlogs = await User.findById(userId).populate("blogs");
      if (!userBlogs || !userBlogs.blogs.length) {
        return res.status(404).json({ message: 'No blogs found for this user.' });
      }
      return res.status(200).json({blog: userBlogs.blogs });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'An error occurred while retrieving blogs.' });
    }
};
