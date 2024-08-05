import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Blog from './Blog';

const UserBlog = () => {
  const [blogs, setBlogs] = useState([]); // Initialize as an empty array
  const [error, setError] = useState(null);
  const id = localStorage.getItem("userId");

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/blog/user/${id}`);
      const data = res.data;
      console.log("Fetched data:", data);
      return data;
    } catch (err) {
      console.log("Error fetching data:", err);
      setError(err);
      return null; // Return null to handle errors gracefully
    }
  };

  useEffect(() => {
    if (id) {
      fetchBlogs().then((data) => {
        if (data && Array.isArray(data.blog)) {
          console.log("Fetched blogs:", data.blog);
          setBlogs(data.blog);
        } else {
          console.log("No blogs found or invalid data structure");
        }
      });
    } else {
      console.log("No user ID found in localStorage");
    }
  }, [id]);

  if (error) {
    return <p>Error fetching blogs. Please try again later.</p>;
  }

  if (blogs.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {blogs.length > 0 ? (
        blogs?.map((blog, index) => (
          <Blog
            key={`${blog.title}-${index}`} // Unique key combining blog title and index
            id={blog._id}// missing
           isUser={true}
            title={blog.title}
            description={blog.description}
            imageURL={blog.image}
            userName={blog.userName} // Assuming each blog object has a userName property
          />
        ))
      ) : (
        <p>No blogs available</p>
      )}
    </div>
  );
};

export default UserBlog;
